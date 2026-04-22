import sys

with open("src/components/LawyerCard.js", "r") as f:
    lines = f.readlines()

# 1. Delete lines 96 to 351 (isSignature block)
# Index 95 to 350
del lines[95:351]

# Re-join to string for easy string replacments
content = "".join(lines)

# 2. Modify container styles
content = content.replace("border: '1px solid rgba(255,255,255,0.07)',", "border: lawyer.isSignature ? '1px solid rgba(212,175,55,0.6)' : '1px solid rgba(255,255,255,0.07)',")
content = content.replace("boxShadow: '0 8px 32px rgba(0,0,0,0.55)',", "boxShadow: lawyer.isSignature ? '0 8px 32px rgba(0,0,0,0.55), 0 0 15px rgba(212,175,55,0.2)' : '0 8px 32px rgba(0,0,0,0.55)',")

# 3. Modify Banner Background and watermark text color
content = content.replace("background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,", "background: '#040404',")
content = content.replace("color: 'rgba(255,255,255,0.07)',", "color: '#000000',")

# 4. Remove Banner Overlays
# We need to remove the Accent glow and Bottom fade to card bg
# They are clearly delimited by comments.
import re
content = re.sub(r'\{\/\* Accent glow \*\/\}.*?pointerEvents: \'none\',\n\s*\}\} />', '', content, flags=re.DOTALL)
content = re.sub(r'\{\/\* Bottom fade to card bg \*\/\}.*?pointerEvents: \'none\',\n\s*\}\} />', '', content, flags=re.DOTALL)

# 5. Modify Avatar sizes
content = content.replace("marginTop: -30,", "marginTop: -50,")
content = content.replace("width: 60, height: 60,", "width: 100, height: 100,")
content = content.replace("border: `2px solid ${colors.accent}60`,", "border: `2px solid ${lawyer.isSignature ? 'rgba(212,175,55,0.6)' : `${colors.accent}60`}`,")
content = content.replace("boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px ${colors.accent}25`,", "boxShadow: lawyer.isSignature ? '0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.25)' : `0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px ${colors.accent}25`,")


with open("src/components/LawyerCard.js", "w") as f:
    f.write(content)

print("LawyerCard.js fixed!")
