"""Make web sizes from your originals.
Usage: python3 tools/make-web-images.py originals/ img/
Input files must already be named <slug>-<NN>.<ext>. Output: img/<name>.jpg (1400px) and img/thumb/<name>.jpg (300px).
Needs Pillow: pip install pillow
"""
import sys, pathlib
from PIL import Image, ImageOps

src, dst = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
(dst / "thumb").mkdir(parents=True, exist_ok=True)
for f in sorted(src.iterdir()):
    if f.suffix.lower() not in {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"}:
        continue
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    for size, folder in ((1400, dst), (300, dst / "thumb")):
        c = im.copy()
        c.thumbnail((size, size))
        c.save(folder / (f.stem + ".jpg"), quality=85, optimize=True)
    print(f.name)
