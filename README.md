# 🏛️ TJMUN Website

> Official website for Thomas Jefferson High School for Science and Technology Model United Nations (TJMUN)

![TJMUN Logo](assets/img/logo5.png)

## 📖 Overview

The TJMUN website serves as the digital hub for Thomas Jefferson High School's Model United Nations program, featuring information about conferences, committees, leadership, and events. The site showcases TECHMUN (the school's annual conference) and provides resources for students, advisors, and participants.

## 🏗️ Project Architecture

### **Organized Directory Structure**

```
tjmun-website/
├── 🏠 index.html                    # Main homepage
├── 📄 404.html                      # Static error page
├── 📄 CNAME                         # Custom domain configuration
├── 📄 _headers                      # Static host security headers
├── 📄 AGENTS.md                     # Agent/contributor workflow notes
├── 📁 pages/                        # Organized content structure
│   ├── 👥 about/                   # About pages and information
│   │   ├── awards.html             # Awards and achievements
│   │   └── leadership.html         # Leadership team profiles
│   ├── 📚 archives/               # Past conference records
│   │   └── 2021/ 2022/ 2023/ 2024/ 2025/ 2026/
│   ├── 🎯 techmun/                # TECHMUN conference pages
│   │   ├── invitation.html        # Conference invitation
│   │   ├── registration.html      # Registration information
│   │   ├── directors.html         # Director profiles
│   │   ├── committees.html        # Committee overview
│   │   ├── committees/            # Committee detail pages by school/category
│   │   ├── schedule.html          # Conference schedule
│   │   ├── position-papers.html   # Position paper guidelines
│   │   ├── conference-policies.html # Conference policies
│   │   └── guest-speakers.html    # Guest speaker information
│   └── 📅 events/                 # Event information
│       ├── boot-camp.html         # MUN boot camp details
│       ├── calendar.html          # Event calendar
│       ├── forms.html             # Registration forms
│       └── mcmunc.pdf             # Event PDF resource
├── 🎨 assets/                      # Static assets
│   ├── css/                       # Stylesheets
│   ├── js/                        # JavaScript + TypeScript sources
│   ├── img/                       # Images and media
│   └── vendor/                    # Third-party libraries
├── 🔧 templates/                   # Template system (for future development)
│   ├── base-template.html         # Main page structure
│   ├── header.html               # Site header component
│   ├── navigation.html           # Navigation menu
│   └── footer.html               # Site footer component
├── 📚 guides/                      # Background guides (PDF resources)
└── 🛠️ scripts/                    # Utility scripts
    ├── fix-all-paths.py          # Path correction script
    ├── template-generator.ts     # Template processing source
    └── validate-awards-links.py  # Link validation
```

## 🚀 Key Features

### **Conference Management**

- **TECHMUN**: Complete conference website with registration, schedules, and committee information
- **Conference Archives**: Historical records of past conferences (2021-2025)
- **External Conferences**: Information about MCMUNC, NAIMUN, VIMUNC participation

### **Committee Information**

- **Crisis Committees**: Interactive crisis simulation committees
- **General Assemblies**: Traditional UN committee simulations
- **Specialized Committees**: Unique themed committees (Titanic, NASCAR, Nvidia, etc.)

### **Program Resources**

- **Leadership Profiles**: Director and officer information with photos and biographies
- **Awards System**: Recognition and achievement tracking
- **Event Calendar**: Comprehensive event scheduling
- **Boot Camp**: Training program for new delegates

### **Technical Features**

- **Responsive Design**: Mobile-friendly Bootstrap-based layout
- **Video Integration**: Background videos for enhanced visual appeal
- **Social Media Integration**: Facebook and Instagram links
- **Static Forms Page**: Links to external FCPS and conference form resources

## 🛠️ Technology Stack

### **Frontend**

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Bootstrap framework
- **TypeScript**: First-party scripts (compiled for browser/runtime use)
- **Bootstrap 5**: Responsive grid system and components
- **AOS (Animate On Scroll)**: Scroll-triggered animations
- **Swiper**: Touch-enabled sliders and carousels
- **GLightbox**: Responsive lightbox gallery

### **Assets & Libraries**

- **Bootstrap Icons**: Comprehensive icon library
- **FontAwesome**: Additional icon sets
- **Google Fonts**: EB Garamond typography
- **PureCounter**: Animated counters

### **Development Tools**

- **Python Scripts**: Automated path fixing and validation
- **Template System**: Modular HTML components
- **npm + TypeScript Compiler**: Type checking and JS build output
- **Git**: Version control and deployment

## 📁 File Organization

### **Before Restructuring (Legacy)**

- All pages scattered in root directory
- Difficult to navigate and maintain
- No logical grouping of related content

### **After Restructuring (Current)**

- Logical directory hierarchy by content type
- Easy navigation and maintenance
- Clear separation of concerns
- Template system for consistency

## 🔧 Setup & Development

### **Local Development**

```bash
# Clone the repository
git clone <repository-url>
cd tjmun-website

# Serve locally (Python)
python3 -m http.server 8000

# Or use any static file server
npx serve .
```

### **TypeScript Workflow**

```bash
npm install
npm run typecheck
npm run build
```

Edit first-party `.ts` files in `assets/js/` and `scripts/`, then run `npm run build` to refresh committed `.js` runtime output for static hosting.

### **Formatting**

```bash
npx prettier@3 --write "**/*.{html,css,js,ts,md}"
```

Formatting intentionally skips `assets/vendor/`, binary media, PDFs, minified files, and source maps.

### **Asset Path Management**

The website uses relative paths that automatically adjust based on directory depth:

- Root level: `assets/`
- One level deep: `../assets/`
- Two levels deep: `../../assets/`

### **Template System**

Templates are available in the `templates/` directory for future development:

- Use `scripts/template-generator.js` (built from `scripts/template-generator.ts`) for processing
- Base template provides consistent structure
- Modular components for header, navigation, footer

## 📝 Content Management

### **Adding New Pages**

1. Create HTML file in appropriate `pages/` subdirectory
2. Use existing pages as templates for consistency
3. Update navigation links in relevant files
4. Test all asset paths and links

### **Committee Pages**

- Follow established naming convention
- Include director/chair profiles with photos
- Provide committee description and background
- Link to relevant background guides in `guides/` folder

### **Conference Pages**

- Use consistent layout and styling
- Include registration information
- Provide schedule and logistics
- Link to position paper requirements

## 🏆 Recent Achievements

### **Website Restructuring Project (2025)**

- ✅ Migrated 60+ pages to organized directory structure
- ✅ Fixed asset paths and navigation links
- ✅ Created template system for future development
- ✅ Improved maintainability and scalability
- ✅ Preserved all original styling and functionality

## 🔗 Important Links

- **Website**: [Live TJMUN Website]
- **Social Media**:
  - [Facebook](https://www.facebook.com/tjhsstmun)
  - [Instagram](https://www.instagram.com/tjhsstmun/)
- **Contact**: tjmodelun@gmail.com

## 📞 Contact Information

**Thomas Jefferson High School for Science and Technology**  
6560 Braddock Rd  
Alexandria, VA 22312  
United States

**Email**: tjmodelun@gmail.com

## 📄 License

© Copyright TJMUN. All Rights Reserved.

---

## 🔧 Development Notes

### **Agent Notes**

- See `AGENTS.md` for contributor and agent workflow expectations.
- Do not commit OS/editor artifacts such as `.DS_Store`, `.idea/`, or `.cursor/`.
- Keep project-owned assets in `assets/img/`; keep third-party libraries in `assets/vendor/`.

### **Future Enhancements**

- Implement dynamic content management system
- Add search functionality
- Enhance mobile responsiveness
- Integrate online registration system
- Add delegate resource portal

### **Maintenance**

- Regularly update conference information
- Keep leadership profiles current
- Update background guides annually
- Test all links and forms periodically

---

_Last updated: June 2026 - Codebase cleanup and contributor workflow refresh_
