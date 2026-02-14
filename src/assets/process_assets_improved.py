import re

source_file = '/Users/abhishek221b/Downloads/EiraHeartsGame.jsx'
target_file = 'web-app-demo/src/assets/gameAssets.ts'

# The regex should be more robust
# Matches: const VARIABLE_NAME = "data:..."
# Captures both name and value
pattern = re.compile(r'const\s+([A-Z_]+)\s*=\s*"(data:[^"]+)"')

try:
    with open(source_file, 'r') as f:
        content = f.read()

    matches = pattern.findall(content)
    
    if matches:
        with open(target_file, 'w') as f:
            for name, value in matches:
                f.write(f'export const {name} = "{value}";\n')
        print(f"Successfully extracted {len(matches)} assets to {target_file}")
    else:
        print("No assets found matching pattern.")

except Exception as e:
    print(f"Error: {e}")
