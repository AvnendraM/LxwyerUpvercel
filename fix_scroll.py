import os

files_to_fix = [
    "/Users/avnendramishra/Desktop/LxwyerUp future/frontend/src/pages/FindLawyerAI.js",
    "/Users/avnendramishra/Desktop/LxwyerUp future/frontend/src/pages/FindLawFirmAI.js",
    "/Users/avnendramishra/Desktop/LxwyerUp future/frontend/src/pages/LxwyerAIPremium.js"
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We might have `flex-1 h-0 overflow-y-auto overscroll-contain p-4 space-y-4`
    import re
    # Match the opening div and its className, we'll replace the full line and add a closing div later?
    # Because changing the structure requires an extra closing `</div>` where the children end.
    # Actually, if I just change the classes to `flex-1 overflow-y-auto` and remove `h-0` and `overscroll-contain`, maybe that's enough?
    # Often, Mac trackpad fails inside flex `h-0` elements. Let's revert `h-0` to `min-h-0` and remove `overscroll-contain`.
    # overscroll-contain aggressively kills Safari/Chrome elastic scroll chaining, creating a "locked" feeling on trackpads.
    content = content.replace("flex-1 h-0 overflow-y-auto overscroll-contain", "flex-1 overflow-y-auto")
    content = content.replace("flex-1 overflow-y-auto overscroll-contain", "flex-1 overflow-y-auto")
    content = content.replace("flex-1 h-0 overflow-y-auto", "flex-1 overflow-y-auto")
    
    # In FindLawyerAI line 1146, we had: className={`flex flex-col flex-1 h-full min-w-0 min-h-0
    # Let's ensure the parent container acts like a strict bounds
    content = content.replace("flex flex-col flex-1 h-full min-w-0 min-h-0 bg-black overflow-hidden", "flex flex-col flex-1 h-full min-w-0 min-h-0 bg-black")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("done")
