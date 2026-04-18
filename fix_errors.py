import os
import re

directory = '/Users/avnendramishra/Desktop/LxwyerUp future/frontend/src/pages'

# We want to match: toast.error(error.response?.data?.detail || 'something');
# and replace it with:
# toast.error(typeof error.response?.data?.detail === 'string' ? error.response.data.detail : (Array.isArray(error.response?.data?.detail) ? error.response.data.detail[0]?.msg : 'something'));

pattern = re.compile(r"toast\.error\(\s*error\.response\?\.data\?\.detail\s*\|\|\s*([^)]+)\s*\)")

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if "toast.error(error.response?.data?.detail" in content:
                # Replace
                def replacer(match):
                    fallback = match.group(1)
                    return f"toast.error(typeof error.response?.data?.detail === 'string' ? error.response.data.detail : (Array.isArray(error.response?.data?.detail) ? error.response.data.detail[0]?.msg : {fallback}))"
                
                new_content = pattern.sub(replacer, content)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {file}")

