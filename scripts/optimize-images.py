from pathlib import Path
import sys
from PIL import Image

path = Path(sys.argv[1] if len(sys.argv) > 1 else "dist/og.png")
if not path.exists():
    raise SystemExit(f"Image not found: {path}")

before = path.stat().st_size
with Image.open(path) as image:
    image.load()
    image.save(path, format="PNG", optimize=True, compress_level=9)
after = path.stat().st_size
saved = before - after
pct = (saved / before * 100) if before else 0
print(f"Optimized {path}: {before:,} -> {after:,} bytes ({pct:.1f}% smaller)")
