from pathlib import Path
from PIL import Image

source = Path("dist/og.png")
output = Path("dist/og.jpg")
if not source.exists():
    raise SystemExit(f"Image not found: {source}")

before = source.stat().st_size
with Image.open(source) as image:
    image.load()
    if image.mode in ("RGBA", "LA"):
        background = Image.new("RGB", image.size, "white")
        alpha = image.getchannel("A")
        background.paste(image.convert("RGB"), mask=alpha)
        image = background
    else:
        image = image.convert("RGB")
    image.save(output, format="JPEG", quality=88, optimize=True, progressive=True, subsampling="4:2:0")

after = output.stat().st_size
saved = before - after
pct = (saved / before * 100) if before else 0
print(f"Optimized social image: {before:,} byte PNG -> {after:,} byte JPEG ({pct:.1f}% smaller)")
