import re

files_to_fix = [
    "/Users/avnendramishra/Desktop/LxwyerUp future/frontend/src/pages/FindLawyerAI.js",
    "/Users/avnendramishra/Desktop/LxwyerUp future/frontend/src/pages/FindLawFirmAI.js",
    "/Users/avnendramishra/Desktop/LxwyerUp future/frontend/src/pages/LxwyerAIPremium.js"
]

for filepath in files_to_fix:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Step 1: Replace className="flex-1 h-0 overflow-y-auto overscroll-contain...
        # We need to inject styles. Easiest way in JSX:
        # className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4" style={{ WebkitOverflowScrolling: 'touch', transform: 'translateZ(0)' }}
        
        # Replace FindLawyerAI match panel
        content = content.replace(
            '<div className="flex-1 h-0 overflow-y-auto overscroll-contain p-4 space-y-4">',
            '<div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 block" style={{ WebkitOverflowScrolling: "touch", WebkitTransform: "translate3d(0,0,0)", touchAction: "pan-y" }}>'
        )
        
        # Details modal scroll fix
        content = content.replace(
            '<div className="flex-1 overflow-y-auto overscroll-contain">',
            '<div className="flex-1 min-h-0 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}>'
        )
        
        content = content.replace(
            '<div className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-10 pb-10">',
            '<div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-10 pb-10" style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}>'
        )
        
        content = content.replace(
            'flex flex-col flex-1 h-full min-w-0 min-h-0 bg-black overflow-hidden',
            'flex flex-col flex-1 h-full min-w-0 min-h-0 bg-black overflow-hidden' # keep this intact to ensure height boundaries
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")
    except Exception as e:
        print(e)
