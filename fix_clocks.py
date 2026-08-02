import re

files = [
    "src/app/trekking-prep/trekking-prep.component.ts",
    "src/app/new-york/new-york.component.ts",
    "src/app/gokyo/gokyo.component.ts",
    "src/app/dallas-texas/dallas-texas.component.ts",
    "src/app/thorongla-pass/thorongla-pass.component.ts",
    "src/app/los-angeles/los-angeles.component.ts",
    "src/app/trekking/trekking.component.ts",
]

import_line = "import { TimeService } from '../service/time.service';\n"
new_method = """updateKathmanduTime() {
    this.timeInKathmandu = this.timeService.getKathmanduTime();
  }"""

for path in files:
    try:
        with open(path, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"SKIP (not found): {path}")
        continue

    changed = False

    if "from '../service/time.service'" not in content:
        lines = content.split('\n', 1)
        content = lines[0] + '\n' + import_line + (lines[1] if len(lines) > 1 else '')
        changed = True

    start_marker = 'updateKathmanduTime() {'
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print(f"WARNING: updateKathmanduTime() not found in {path} (may already be fixed)")
    else:
        brace_count = 0
        end_idx = None
        for j in range(start_idx + len(start_marker) - 1, len(content)):
            if content[j] == '{':
                brace_count += 1
            elif content[j] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = j + 1
                    break
        if end_idx is None:
            print(f"WARNING: could not find matching closing brace in {path}")
        else:
            content = content[:start_idx] + new_method + content[end_idx:]
            changed = True

    if 'private timeService' not in content:
        new_content = re.sub(
            r'(constructor\s*\(\s*)',
            r'\1private timeService: TimeService,\n    ',
            content,
            count=1
        )
        if new_content != content:
            content = new_content
            changed = True

    if changed:
        with open(path, 'w') as f:
            f.write(content)
        print(f"Updated: {path}")
    else:
        print(f"No changes needed: {path}")
