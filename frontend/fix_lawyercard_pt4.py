import sys

with open("src/components/LawyerCard.js", "r") as f:
    content = f.read()

# 1. Revert Top-level Card border & box-shadow
old_card_style_start = """      style={{
        background: '#040404',
        border: lawyer.isSignature ? '1px solid rgba(212,175,55,0.6)' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: lawyer.isSignature ? '0 8px 32px rgba(0,0,0,0.55), 0 0 15px rgba(212,175,55,0.2)' : '0 8px 32px rgba(0,0,0,0.55)',"""

new_card_style_start = """      style={{
        background: '#040404',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.55)',"""
content = content.replace(old_card_style_start, new_card_style_start)

# 2. Revert Avatar border & box-shadow
old_avatar_style = """        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          border: `2px solid ${lawyer.isSignature ? 'rgba(212,175,55,0.6)' : `${themeColor}60`}`,
          outline: '3px solid #0b0f1a',
          overflow: 'hidden', flexShrink: 0,
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
          boxShadow: lawyer.isSignature ? '0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.25)' : `0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px ${themeColor}25`,"""

new_avatar_style = """        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          border: `2px solid ${themeColor}60`,
          outline: '3px solid #0b0f1a',
          overflow: 'hidden', flexShrink: 0,
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 0 1px ${themeColor}25`,"""
content = content.replace(old_avatar_style, new_avatar_style)

# 3. Remove shimmer from Signature text
old_sig_text = """        {lawyer.isSignature && (
          <span style={{
            position: 'absolute', top: 46, right: 18,
            fontFamily: '"Great Vibes", cursive', fontSize: 24, color: '#d4af37',
            opacity: 0.85,
            background: 'linear-gradient(90deg, #d4af37 0%, #ffffff 50%, #d4af37 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            animation: 'goldShine 3s infinite linear'
          }}>
            <style>{`@keyframes goldShine { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }`}</style>
            Signature
          </span>
        )}"""

new_sig_text = """        {lawyer.isSignature && (
          <span style={{
            position: 'absolute', top: 46, right: 18,
            fontFamily: '"Great Vibes", cursive', fontSize: 24, color: '#d4af37',
            opacity: 0.85
          }}>
            Signature
          </span>
        )}"""
content = content.replace(old_sig_text, new_sig_text)

with open("src/components/LawyerCard.js", "w") as f:
    f.write(content)

