import sys

with open("src/components/LawyerCard.js", "r") as f:
    content = f.read()

# 1. Full black card background
content = content.replace("background: '#0b0f1a',", "background: '#040404',")

# 2. Book button gradient logic
# Currently it is: background: 'linear-gradient(135deg, #1d4ed8, #4338ca)'
new_bg = "background: lawyer.isSignature ? 'linear-gradient(135deg, #d4af37 0%, #b5952f 100%)' : 'linear-gradient(135deg, #1d4ed8, #4338ca)',"
new_color = "color: lawyer.isSignature ? '#000000' : '#fff',"

content = content.replace("background: 'linear-gradient(135deg, #1d4ed8, #4338ca)',", new_bg)
content = content.replace("color: '#fff', fontSize: 12, fontWeight: 700,", new_color + " fontSize: 12, fontWeight: 700,")

new_hover_enter = "onMouseEnter={e => { e.currentTarget.style.background = lawyer.isSignature ? 'linear-gradient(135deg, #e5bd3d, #c5a336)' : 'linear-gradient(135deg,#2563eb,#4f46e5)'; e.currentTarget.style.boxShadow = lawyer.isSignature ? '0 6px 22px rgba(212,175,55,0.4)' : '0 6px 22px rgba(29,78,216,0.5)'; }}"
new_hover_leave = "onMouseLeave={e => { e.currentTarget.style.background = lawyer.isSignature ? 'linear-gradient(135deg, #d4af37 0%, #b5952f 100%)' : 'linear-gradient(135deg,#1d4ed8,#4338ca)'; e.currentTarget.style.boxShadow = lawyer.isSignature ? '0 4px 16px rgba(212,175,55,0.25)' : '0 4px 16px rgba(29,78,216,0.35)'; }}"

content = content.replace("onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#2563eb,#4f46e5)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(29,78,216,0.5)'; }}", new_hover_enter)
content = content.replace("onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#1d4ed8,#4338ca)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(29,78,216,0.35)'; }}", new_hover_leave)

# 3. Watermark top right
old_watermark = """        <span style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',"""
new_watermark = """        <span style={{
          position: 'absolute',
          top: 14, right: 18,
          transform: 'none',"""
content = content.replace(old_watermark, new_watermark)

# 4. Verified badge size and move to top left
old_verified = """          <div style={{
            position: 'absolute', top: 12, right: 12,
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '3px 9px', borderRadius: 999,
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            fontSize: 10, fontWeight: 700, color: '#34d399',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 5px #10b981' }} />"""

new_verified = """          <div style={{
            position: 'absolute', top: 12, left: 12,
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '2px 6px', borderRadius: 999,
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            fontSize: 7, fontWeight: 700, color: '#34d399',
          }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 5px #10b981' }} />"""

content = content.replace(old_verified, new_verified)

# 5. Add Cursive signature text in the banner if isSignature
# I'll inject it just underneath the watermark
signature_cursive = """
        {lawyer.isSignature && (
          <span style={{
            position: 'absolute', top: 46, right: 18,
            fontFamily: '"Great Vibes", cursive', fontSize: 24, color: '#d4af37',
            opacity: 0.85
          }}>Signature</span>
        )}
"""

# The watermark block ends with `       Lxwyer Up\n        </span>`
watermark_end = "          Lxwyer Up\n        </span>"
content = content.replace(watermark_end, watermark_end + signature_cursive)

with open("src/components/LawyerCard.js", "w") as f:
    f.write(content)

