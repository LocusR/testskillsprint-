"""
Збирає PNG-знімки з capture-review.mjs у PDF для ревʼю.

    python scripts/build-review-pdf.py <тека-знімків> <вихідний.pdf>

Високі знімки (сторінка може бути 10000px) нарізаються на сторінки
розумної висоти — інакше PDF-читалка показує одну довжелезну смугу,
де при вписуванні у вікно нічого не прочитати.

Кожна сторінка отримує підпис: назва екрана, шлях і номер фрагмента.
"""

import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# Консоль Windows за замовчуванням cp1252 і падає на кирилиці у print()
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BAR_H = 46          # висота смуги з підписом
OVERLAP = 60        # перекриття між фрагментами, щоб не губився рядок на стику
BG = (255, 255, 255)
BAR_BG = (46, 57, 63)
BAR_FG = (255, 255, 255)
BAR_MUTED = (150, 205, 200)


def load_font(size):
    for name in ('segoeui.ttf', 'arial.ttf', 'tahoma.ttf'):
        try:
            return ImageFont.truetype(f'C:/Windows/Fonts/{name}', size)
        except OSError:
            continue
    return ImageFont.load_default()


FONT = load_font(20)
FONT_SMALL = load_font(16)


def label(width, title, subtitle):
    """Малює темну смугу з назвою екрана."""
    bar = Image.new('RGB', (width, BAR_H), BAR_BG)
    d = ImageDraw.Draw(bar)
    d.text((18, BAR_H // 2), title, font=FONT, fill=BAR_FG, anchor='lm')
    if subtitle:
        d.text((width - 18, BAR_H // 2), subtitle, font=FONT_SMALL,
               fill=BAR_MUTED, anchor='rm')
    return bar


def slice_shot(path, title, subtitle, slice_h):
    """Ріже знімок на сторінки й додає підпис до кожної."""
    img = Image.open(path).convert('RGB')
    w, h = img.size
    pages = []

    if h <= slice_h:
        chunks = [(0, h)]
    else:
        chunks, y = [], 0
        while y < h:
            end = min(y + slice_h, h)
            chunks.append((y, end))
            if end >= h:
                break
            y = end - OVERLAP

    total = len(chunks)
    for i, (top, bottom) in enumerate(chunks, 1):
        part = img.crop((0, top, w, bottom))
        suffix = f'{subtitle}   {i}/{total}' if total > 1 else subtitle
        page = Image.new('RGB', (w, BAR_H + part.height), BG)
        page.paste(label(w, title, suffix), (0, 0))
        page.paste(part, (0, BAR_H))
        pages.append(page)
    return pages


def cover(width, preset, viewport, count):
    h = 520
    img = Image.new('RGB', (width, h), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, width, 8], fill=(0, 197, 167))

    big = load_font(46)
    mid = load_font(24)
    small = load_font(18)

    y = 90
    d.text((60, y), 'BES / SkillSprint', font=big, fill=BAR_BG)
    y += 70
    human = 'Комп\u2019ютерна версія' if preset == 'desktop' else 'Мобільна версія'
    d.text((60, y), human, font=big, fill=(0, 197, 167))
    y += 90
    d.text((60, y), f'Ширина вьюпорта: {viewport["width"]}\u00d7{viewport["height"]} px',
           font=mid, fill=BAR_BG)
    y += 40
    d.text((60, y), f'Екранів: {count}', font=mid, fill=BAR_BG)
    y += 60
    d.text((60, y), 'Знімки зроблено з локальної збірки після прокрутки сторінки,',
           font=small, fill=(110, 120, 125))
    y += 26
    d.text((60, y), 'щоб відпрацювали анімації появи.', font=small, fill=(110, 120, 125))
    return img


def main():
    src = Path(sys.argv[1])
    out = Path(sys.argv[2])
    manifest = json.loads((src / 'manifest.json').read_text(encoding='utf-8'))

    preset = manifest['preset']
    vp = manifest['viewport']
    slice_h = 1000 if preset == 'desktop' else 1100

    pages = [cover(vp['width'], preset, vp, len(manifest['pages']))]

    for p in manifest['pages']:
        f = src / f"{p['slug']}.png"
        if not f.exists():
            print(f'  ПРОПУЩЕНО (немає файлу): {f.name}')
            continue
        got = slice_shot(f, p['name'], p['path'], slice_h)
        pages.extend(got)
        print(f"  {p['slug']:<16} -> {len(got)} стор.")

    out.parent.mkdir(parents=True, exist_ok=True)
    pages[0].save(out, save_all=True, append_images=pages[1:], resolution=144.0)
    size_mb = out.stat().st_size / 1024 / 1024
    print(f'\n{out.name}: {len(pages)} сторінок, {size_mb:.1f} MB')


if __name__ == '__main__':
    main()
