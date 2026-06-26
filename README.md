# TJMUN Website

Official website for Thomas Jefferson High School for Science and Technology Model United Nations (TJMUN).

![TJMUN Logo](assets/img/logo5.png)

## Overview

This repository contains the static website for TJMUN. It is the public hub for club information, leadership, awards, events, TechMUN, committee pages, background guides, and conference archives.

The site is currently organized as plain HTML, CSS, JavaScript, images, PDFs, and vendored frontend libraries. There is no package manager config or build step required for normal local development.

## Current Structure

```text
tjmun-website/
├── index.html                         # Homepage
├── 404.html                           # Not-found page
├── CNAME                              # Custom domain: tjmun.org
├── _headers                           # Hosting/security headers
├── assets/
│   ├── css/                           # Site stylesheets
│   │   ├── main.css
│   │   ├── landing-new.css
│   │   └── landing-future.css
│   ├── js/                            # Site JavaScript
│   │   ├── main.js
│   │   └── event-signup.js
│   ├── img/                           # Photos, logos, videos, graphics
│   └── vendor/                        # Vendored frontend libraries
│       ├── aos/
│       ├── bootstrap/
│       ├── bootstrap-icons/
│       ├── fontawesome-free/
│       ├── glightbox/
│       ├── php-email-form/
│       ├── purecounter/
│       └── swiper/
├── pages/
│   ├── about/
│   │   ├── awards.html
│   │   └── leadership.html
│   ├── archives/                      # External conference archive pages
│   │   ├── 2021/
│   │   ├── 2022/
│   │   ├── 2023/
│   │   ├── 2024/
│   │   ├── 2025/
│   │   └── 2026/
│   ├── events/
│   │   ├── boot-camp.html
│   │   ├── calendar.html
│   │   ├── forms.html
│   │   └── mcmunc.pdf
│   ├── techmun/
│   │   ├── invitation.html
│   │   ├── registration.html
│   │   ├── directors.html
│   │   ├── committees.html
│   │   ├── schedule.html
│   │   ├── position-papers.html
│   │   ├── conference-policies.html
│   │   ├── guest-speakers.html
│   │   ├── closings.html
│   │   └── committees/
│   │       ├── high-school/
│   │       │   ├── hs-ga/
│   │       │   ├── hs-spec/
│   │       │   └── hs-crisis/
│   │       └── middle-school/
│   │           ├── ms-ga/
│   │           ├── ms-spec/
│   │           └── ms-crisis/
│   ├── committees/                    # Legacy placeholder directory
│   └── conferences/                   # Legacy placeholder directory
├── guides/                            # Committee background guides as PDFs
├── templates/                         # Reusable HTML template fragments
│   ├── base-template.html
│   ├── header.html
│   ├── navigation.html
│   └── footer.html
├── scripts/
│   ├── fix-all-paths.py
│   ├── template-generator.js
│   └── validate-awards-links.py
└── forms/
    ├── contact.php
    └── quote.php
```

## Main Site Areas

### Homepage

[index.html](index.html) is the main landing page. It includes the announcement banner, hero video, club overview, statistics, testimonials, leadership preview, and shared navigation/footer.

### About

`pages/about/` contains club-facing pages:

- `leadership.html` for officer and director profiles
- `awards.html` for awards and achievements

### Events

`pages/events/` contains event pages and related resources:

- `boot-camp.html`
- `calendar.html`
- `forms.html`
- `mcmunc.pdf`

### TechMUN

`pages/techmun/` contains the active TechMUN section:

- `invitation.html`
- `registration.html`
- `directors.html`
- `committees.html`
- `schedule.html`
- `position-papers.html`
- `conference-policies.html`
- `guest-speakers.html`
- `closings.html`

Committee pages live under `pages/techmun/committees/`, split by school level and committee type:

- High school: `hs-ga/`, `hs-spec/`, `hs-crisis/`
- Middle school: `ms-ga/`, `ms-spec/`, `ms-crisis/`

### Archives

`pages/archives/` stores past external conference pages by year. Current archive folders cover 2021 through 2026.

### Guides

`guides/` stores committee background guides as PDFs. Committee pages link into this folder.

## Technology

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- FontAwesome
- AOS
- Swiper
- GLightbox
- PureCounter
- Google Fonts
- PHP form files kept in `forms/`

Most dependencies are vendored directly under `assets/vendor/`, so the site can run without installing npm packages.

## Local Development

Serve the repository root with any static file server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

There is no build command for normal edits. Change HTML, CSS, JS, images, or PDFs directly, then refresh the browser.

## Path Conventions

Use paths that match the page depth:

- Root pages use `assets/...`
- Files directly under `pages/about/`, `pages/events/`, or `pages/techmun/` commonly use `../../assets/...`
- Committee pages under `pages/techmun/committees/...` need deeper relative paths, such as `../../../../../assets/...`, or root-relative links

Many current navigation links are root-relative, such as `/pages/techmun/registration.html`. Keep new navigation links consistent with the surrounding file.

## Forms

`assets/js/event-signup.js` posts event signup data to a Google Apps Script endpoint.

`forms/contact.php` and `forms/quote.php` are PHP handlers kept in the repository. Static hosts such as GitHub Pages or Netlify static deploys will not execute PHP files unless a PHP-capable backend is configured.

## Templates And Scripts

`templates/` contains reusable HTML fragments for future template-driven work.

`scripts/` contains utility scripts:

- `template-generator.js` generates pages from templates
- `fix-all-paths.py` was used for path migration work
- `validate-awards-links.py` checks awards-page links

Before using generated output, verify links against the current active structure. Active TechMUN pages are under `pages/techmun/`, not `pages/conferences/techmun/`.

## Content Updates

When adding or changing content:

1. Put new pages in the matching `pages/` subdirectory.
2. Keep TechMUN content under `pages/techmun/`.
3. Put committee pages under the correct school-level and committee-type folder.
4. Put background guides in `guides/`.
5. Put photos, videos, and graphics in `assets/img/`.
6. Update navigation links in affected pages or templates.
7. Test changed pages locally and check links from the homepage/navigation.

## Deployment

The custom domain is configured through `CNAME`:

```text
tjmun.org
```

Because the site is static, deployment should publish the repository root as the web root.

## Important Links

- Website: [tjmun.org](https://tjmun.org)
- Facebook: [facebook.com/tjhsstmun](https://www.facebook.com/tjhsstmun)
- Instagram: [instagram.com/tjhsstmun](https://www.instagram.com/tjhsstmun/)
- Contact: tjmodelun@gmail.com

## Maintenance Notes

- Keep leadership profiles and photos current.
- Update TechMUN dates, registration links, schedules, committees, and guides each conference cycle.
- Update archive pages after external conferences.
- Test mobile navigation after navigation changes.
- Check form behavior after changing `pages/events/forms.html` or `assets/js/event-signup.js`.
- Avoid editing vendored files in `assets/vendor/` unless updating a vendored library intentionally.

## License

Copyright TJMUN. All rights reserved.

Last updated: June 2026.
