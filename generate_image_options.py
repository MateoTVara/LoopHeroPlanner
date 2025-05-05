# generate_image_options.py
import os
import json

image_options = {}
for root, _, files in os.walk("imgs"):
    for file in files:
        if file.lower().endswith(('.webp', '.jpg', '.jpeg', '.png', '.gif')):
            path = os.path.join(root, file).replace("\\", "/")
            desc = os.path.splitext(file)[0]
            image_options[path] = {
                "visible": False,
                "description": desc
            }

with open("imageOptions.js", "w", encoding="utf-8") as f:
    f.write("const imageOptions = " + json.dumps(image_options, indent=2) + ";\n")
print("✅ imageOptions.js generated.")
