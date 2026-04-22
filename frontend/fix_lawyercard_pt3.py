import sys

with open("src/components/LawyerCard.js", "r") as f:
    content = f.read()

# 1. Define themeColor dynamically based on lawyer.isSignature
theme_def = """  const colors   = getColors(lawyer.specialization);

  const charge30 = lawyer.charge_30min || lawyer.consultation_fee_30min;"""

new_theme_def = """  const colors   = getColors(lawyer.specialization);
  const themeColor = lawyer.isSignature ? '#d4af37' : colors.accent;

  const charge30 = lawyer.charge_30min || lawyer.consultation_fee_30min;"""

content = content.replace(theme_def, new_theme_def)

# 2. Replace colors.accent with themeColor everywhere EXCEPT where it's already properly scoped inside the getColors logic
# The easiest way is to just replace all literally "colors.accent" strings that are in the component body
# Let's count them
content = content.replace("color: colors.accent", "color: themeColor")
content = content.replace("colors.accent}60", "themeColor}60")
content = content.replace("colors.accent}25", "themeColor}25")
content = content.replace("colors.accent}14", "themeColor}14")
content = content.replace("colors.accent}30", "themeColor}30")
content = content.replace("colors.accent}15", "themeColor}15")
content = content.replace("colors.accent}40", "themeColor}40")
content = content.replace("colors.accent}25", "themeColor}25")
content = content.replace("colors.accent}60", "themeColor}60")

# For the MapPin issue in the earlier block? Wait I used colors.accent in the file originally.
# Let's use regex to replace `colors.accent` broadly but safely
import re
# Replace all `${colors.accent}` with `${themeColor}`
content = content.replace("${colors.accent}", "${themeColor}")

# 3. Add shine effect to the "Signature" text in the banner
old_sig_text = """        {lawyer.isSignature && (
          <span style={{
            position: 'absolute', top: 46, right: 18,
            fontFamily: '"Great Vibes", cursive', fontSize: 24, color: '#d4af37',
            opacity: 0.85
          }}>Signature</span>
        )}"""

new_sig_text = """        {lawyer.isSignature && (
          <span style={{
            position: 'absolute', top: 46, right: 18,
            fontFamily: '"Great Vibes", cursive', fontSize: 24, color: '#d4af37',
            opacity: 0.85,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            animation: 'goldShine 3s infinite linear'
          }}>
            <style>{`@keyframes goldShine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }`}</style>
            Signature
          </span>
        )}"""
content = content.replace(old_sig_text, new_sig_text)

with open("src/components/LawyerCard.js", "w") as f:
    f.write(content)

