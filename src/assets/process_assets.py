import re

source_file = '/Users/abhishek221b/Downloads/EiraHeartsGame.jsx'
target_file = 'web-app-demo/src/assets/gameAssets.ts'

asset_names = [
    'EIRA_PHOTO', 'EIRA_FACE', 'BG_PHOTO', 'CAT_HEAD', 
    'GOLD_HEART', 'RED_HEART', 'EXPLOSION_GIF', 'MEOW_SOUND'
]

try:
    with open(source_file, 'r') as f:
        content = f.read()

    extracted_lines = []
    print(f"Read {len(content)} bytes from {source_file}")
    
    for name in asset_names:
        # Looking for pattern: const NAME = "data:..."
        # Note: The original file might have spacing variations or newlines
        pattern = rf'const\s+{name}\s*=\s*"(data:[^"]+)"'
        match = re.search(pattern, content)
        if match:
            # Create export statement
            extracted_lines.append(f'export const {name} = "{match.group(1)}";')
            print(f"Found {name}, length: {len(match.group(1))}")
        else:
            print(f"Warning: Could not find {name}")

    if extracted_lines:
        with open(target_file, 'w') as f:
            f.write('\n'.join(extracted_lines))
        print(f"Successfully extracted {len(extracted_lines)} assets to {target_file}")
    else:
        print("No assets found to extract.")

except Exception as e:
    print(f"Error: {e}")
