"""Gray placeholder photos in mixed aspect ratios, named from data.js. Run from the repository root."""
import re, pathlib, random
from PIL import Image, ImageDraw, ImageFont

root = pathlib.Path(__file__).resolve().parent.parent
data = (root / "data.js").read_text()
works = re.findall(r'slug:\s*"([a-z0-9]+)".*?count:\s*(\d+)', data)
ratios = [(4, 5), (5, 4), (2, 3), (3, 2), (1, 1), (3, 4)]
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 48)
except Exception:
    font = ImageFont.load_default()
(root / "img" / "thumb").mkdir(parents=True, exist_ok=True)
random.seed(1)
for slug, count in works:
    for n in range(1, int(count) + 1):
        w, h = random.choice(ratios)
        long_edge = 1400
        W, H = (long_edge, int(long_edge * h / w)) if w >= h else (int(long_edge * w / h), long_edge)
        g = random.randint(205, 235)
        im = Image.new("RGB", (W, H), (g, g, g))
        d = ImageDraw.Draw(im)
        label = f"{slug} {n:02d}"
        tw = d.textlength(label, font=font)
        d.text(((W - tw) / 2, H / 2 - 24), label, fill=(90, 90, 90), font=font)
        name = f"{slug}-{n:02d}.jpg"
        im.save(root / "img" / name, quality=82)
        t = im.copy(); t.thumbnail((300, 300)); t.save(root / "img" / "thumb" / name, quality=82)
print("done")
