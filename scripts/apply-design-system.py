#!/usr/bin/env python3
"""Move every page onto the shared design system (assets/css/design-system.css).

For each HTML page (and the page template) this:
  1. Points the Google Fonts link at Libre Caslon Display + Libre Franklin (adds it if missing).
  2. Removes the per-page EB Garamond `font-family` overrides from inline <style>
     blocks and style="" attributes. A rule is deleted only when nothing else is
     left in it; other declarations and rules are kept. Empty <style> blocks are dropped.
     The off-palette navy rgb(11, 11, 89) and grey #333 are mapped to tokens.
  3. Links /assets/css/design-system.css at the end of <head>, once.

Safe to run repeatedly. Usage:
    python3 scripts/apply-design-system.py [--check]
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FONTS_HREF = (
    "https://fonts.googleapis.com/css2?family=Libre+Caslon+Display"
    "&family=Libre+Franklin:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
)
DS_LINK = '<link href="/assets/css/design-system.css" rel="stylesheet" />'

ATTR_RE = re.compile(r'style="([^"]*)"', re.S)
ATTR_FONT_RE = re.compile(r"[ \t]*font-family:\s*(?:[^;&]|&quot;)*?Garamond(?:[^;&]|&quot;)*;?[ \t]*\n?")
OLD_NAVY_RE = re.compile(r"rgb\(\s*11,\s*11,\s*89\s*\)")
FONT_LINK_RE = re.compile(r'href="https://fonts\.googleapis\.com/css2\?family=[^"]*"')
STYLE_RE = re.compile(r"(<style[^>]*>)(.*?)(</style>)", re.S)
RULE_RE = re.compile(r"([^{}]*)\{([^{}]*)\}")


def strip_garamond(css: str) -> str:
    def rule(m: re.Match) -> str:
        selector, body = m.group(1), m.group(2)
        decls = [d for d in body.split(";")]
        kept = [d for d in decls if not ("font-family" in d and "Garamond" in d)]
        if len(kept) == len(decls):
            return m.group(0)
        if not "".join(kept).strip():
            # Nothing but the font override: drop the rule, keep the leading newline.
            return "\n" if selector.startswith("\n") else ""
        return f"{selector}{{{';'.join(kept)}}}"

    out = RULE_RE.sub(rule, css)
    return re.sub(r"\n\s*\n(\s*\n)+", "\n\n", out)


def migrate(text: str) -> str:
    if FONT_LINK_RE.search(text):
        text = FONT_LINK_RE.sub(f'href="{FONTS_HREF}"', text, count=1)
    else:
        # Page never loaded web fonts: add them ahead of the first stylesheet.
        fonts = (
            '<link rel="preconnect" href="https://fonts.googleapis.com" />\n'
            '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n'
            f'    <link href="{FONTS_HREF}" rel="stylesheet" />\n    '
        )
        text = re.sub(r"(<link[^>]*rel=\"stylesheet\")", lambda m: fonts + m.group(1), text, count=1)

    def style(m: re.Match) -> str:
        inner = strip_garamond(m.group(2))
        if not inner.strip():
            return ""
        return m.group(1) + inner + m.group(3)

    text = STYLE_RE.sub(style, text)

    def attr(m: re.Match) -> str:
        # Values may contain &quot; entities, so match the whole declaration rather than split on ";".
        value = ATTR_FONT_RE.sub("", m.group(1))
        return f'style="{value}"' if value != m.group(1) else m.group(0)

    text = ATTR_RE.sub(attr, text)
    # Off-palette navy and grey used inline on the TechMUN letters/committee pages.
    text = OLD_NAVY_RE.sub("var(--tj-navy)", text)
    text = re.sub(r"(\bcolor:\s*)#333\b", r"\1var(--tj-ink)", text)
    text = re.sub(r"\n[ \t]*\n(?=[ \t]*</head>)", "\n", text)

    if "/assets/css/design-system.css" not in text:
        text = text.replace("</head>", f"    {DS_LINK}\n  </head>", 1)
    return text


def main() -> int:
    check = "--check" in sys.argv
    pages = sorted(ROOT.glob("pages/**/*.html")) + [ROOT / "404.html", ROOT / "templates/base-template.html"]
    changed = []
    for page in pages:
        before = page.read_text(encoding="utf-8")
        after = migrate(before)
        if after != before:
            changed.append(page.relative_to(ROOT))
            if not check:
                page.write_text(after, encoding="utf-8")
    verb = "would change" if check else "changed"
    print(f"{verb} {len(changed)} of {len(pages)} files")
    leftover = [p for p in pages if "Garamond" in p.read_text(encoding="utf-8")]
    if leftover and not check:
        print("still mention Garamond:", *[str(p.relative_to(ROOT)) for p in leftover], sep="\n  ")
    return 0


if __name__ == "__main__":
    sys.exit(main())
