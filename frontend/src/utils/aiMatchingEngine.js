import axios from 'axios';
import { API } from '../App';

/**
 * Shared AI Matching Engine
 * Unifies the keyword detection, conversational fallback, and smart matching
 * for Lawyers and Law Firms across the platform.
 */

// We will export functions:
// smartMatchLawyers(query)
// smartMatchFirms(query)
// ... and common detection functions

export const smartMatchLawyers = async (query, sessionId) => {
  try {
    const res = await axios.post(`${API}/smart-match/lawyers`, {
      query,
      session_id: sessionId || Math.random().toString(36).slice(2),
    });
    return res.data; // { results, total_found, query_summary }
  } catch (err) {
    console.error('Smart match API error:', err);
    return null;
  }
};

export const smartMatchFirms = async (query, sessionId) => {
  try {
    const res = await axios.post(`${API}/smart-match/firms`, { 
      query, 
      session_id: sessionId || Math.random().toString(36).slice(2)
    });
    return res.data;
  } catch (error) {
    console.error('Smart match API error:', error);
    return null;
  }
};

// ... we will copy the detection logic from FindLawyerAI / FindLawfirmAI shortly
