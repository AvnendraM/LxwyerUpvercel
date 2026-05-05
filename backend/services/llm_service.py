import os
import json
import logging
import httpx
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

# Global Llama instance to keep the model in memory
_llm = None
# Flag to indicate if we should just skip trying to load the local model
_skip_local_model = False

def get_llm():
    global _llm, _skip_local_model
    if _skip_local_model:
        return None
        
    if _llm is None:
        try:
            from llama_cpp import Llama
            
            model_path = "/Users/avnendramishra/Desktop/Lxwyer ai gpu 1.gguf"
            if not os.path.exists(model_path):
                logger.warning(f"Local model file not found at {model_path}. Will use cloud fallback.")
                _skip_local_model = True
                return None
            
            logger.info(f"Loading GGUF model from {model_path}. This may take a while and require significant RAM...")
            # n_gpu_layers=-1 attempts to offload all layers to Metal GPU
            # n_ctx=2048 to keep memory usage reasonable while allowing decent context
            _llm = Llama(
                model_path=model_path,
                n_gpu_layers=-1, 
                n_ctx=2048,
                verbose=False
            )
            logger.info("Successfully loaded GGUF model.")
        except ImportError:
            logger.warning("llama_cpp not installed. Will use cloud fallback.")
            _skip_local_model = True
            _llm = None
        except Exception as e:
            logger.error(f"Failed to load GGUF model: {e}")
            _skip_local_model = True
            _llm = None
    return _llm

def get_groq_response(system_prompt: str, user_query: str) -> Optional[str]:
    """Call the Groq API as a fallback when the local model isn't available."""
    groq_api_key = os.environ.get("GROQ_API_KEY")
    if not groq_api_key:
        logger.error("GROQ_API_KEY not found in environment variables. Cannot use cloud fallback.")
        return None
        
    logger.info("Using Groq Cloud API for AI response...")
    
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {groq_api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_query}
        ],
        "temperature": 0.3,
        "max_tokens": 1500,
        "response_format": {"type": "json_object"}
    }
    
    try:
        # Create a synchronous client for compatibility with the current function signature
        with httpx.Client(timeout=30.0) as client:
            response = client.post(url, headers=headers, json=data)
            response.raise_for_status()
            
            result = response.json()
            return result["choices"][0]["message"]["content"]
    except Exception as e:
        logger.error(f"Groq API call failed: {e}")
        return None

def generate_legal_response(query: str, history: list = None) -> Optional[Dict[str, Any]]:
    """
    Generate a structured legal response using the local GGUF model or Groq fallback.
    The response is parsed into the expected JSON format.
    """
    system_instruction = """You are Lxwyer AI, an expert Indian legal assistant. You provide highly accurate, concise, and structured legal information based on Indian laws (BNS, BNSS, IPC, CPC, etc.).
You must ALWAYS respond in valid JSON format exactly matching this structure:
{
  "intro": "A brief 2-sentence introduction explaining the area of law.",
  "intent": "The category of law (e.g. Criminal Law 👮, Family Law 👨‍👩‍👧, Corporate Law 💼, etc.)",
  "sentiment": "Either 'Neutral 😐' or 'URGENT 🚨' if the situation sounds like an emergency.",
  "sources": ["List of applicable Indian laws or acts"],
  "cards": [
    {
      "id": "overview",
      "icon": "📋",
      "title": "Case Overview",
      "summary": "3 very short bullet points summarizing the situation",
      "detail": "A detailed explanation of the legal concepts and how the law applies."
    },
    {
      "id": "rights",
      "icon": "🛡️",
      "title": "Your Rights & Options",
      "summary": "3 short bullet points on legal rights",
      "detail": "Detailed explanation of rights and legal remedies available."
    },
    {
      "id": "next_steps",
      "icon": "🔍",
      "title": "Immediate Next Steps",
      "summary": "3 short action items",
      "detail": "Detailed step-by-step action plan."
    }
  ]
}
Do NOT output any markdown, code blocks, or text outside of the JSON object. Only output the raw JSON object."""

    llm = get_llm()
    raw_text = None

    if llm:
        # Using Local GGUF Model
        prompt = f"<|system|>\n{system_instruction}\n\n<|user|>\n{query}\n\n<|assistant|>\n"
        try:
            response = llm(
                prompt,
                max_tokens=1000,
                temperature=0.3,
                stop=["<|user|>", "<|system|>"],
                echo=False
            )
            raw_text = response["choices"][0]["text"].strip()
        except Exception as e:
            logger.error(f"Error generating response from local LLM: {e}")
            
    # If local model failed or isn't available, fallback to Groq
    if not raw_text:
        raw_text = get_groq_response(system_instruction, query)
        
    if not raw_text:
        return None

    try:
        # Clean up Markdown JSON formatting if present
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
        
        raw_text = raw_text.strip()
        
        parsed_json = json.loads(raw_text)
        return parsed_json
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse LLM output as JSON: {e}\nRaw output: {raw_text}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error in response parsing: {e}")
        return None
