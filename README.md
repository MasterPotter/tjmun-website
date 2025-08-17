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
├── 📁 pages/                        # Organized content structure
│   ├── 👥 about/                   # About pages and information
│   │   ├── awards.html             # Awards and achievements
│   │   └── leadership.html         # Leadership team profiles
│   ├── 🏛️ committees/              # Committee information by category
│   │   ├── crisis/                 # Crisis committees
│   │   │   ├── Blast.html          # Space Race committee
│   │   │   ├── Fractured.html      # Sokovia Accords committee
│   │   │   ├── Lightning.html      # Flash's Foes committee
│   │   │   ├── XOXO.html          # Gossip Girl committee
│   │   │   ├── JCC_Cali.html      # Drug Cartels: Cali
│   │   │   └── JCC_Medellin.html  # Drug Cartels: Medellin
│   │   ├── high-school/           # High school GA committees
│   │   │   ├── DISEC.html         # Disarmament committee
│   │   │   ├── ECOFIN.html        # Economic & Financial committee
│   │   │   └── UNICEF.html        # Children's Fund committee
│   │   └── middle-school/         # Middle school committees
│   │       ├── UNHCR.html         # Refugee commission
│   │       └── WHO.html           # World Health Organization
│   ├── 🎯 conferences/             # Conference information
│   │   ├── archives/              # Past conference records (2021-2025)
│   │   │   ├── 2021/ 2022/ 2023/ 2024/ 2025/
│   │   ├── external/              # External conference info
│   │   │   ├── mcmunc/ naimun/ vimunc/
│   │   └── techmun/              # TECHMUN conference pages
│   │       ├── index.html         # TECHMUN main page
│   │       ├── invitation.html    # Conference invitation
│   │       ├── registration.html  # Registration information
│   │       ├── directors.html     # Director profiles
│   │       ├── committees.html    # Committee overview
│   │       ├── schedule.html      # Conference schedule
│   │       ├── position-papers.html # Position paper guidelines
│   │       ├── conference-policies.html # Conference policies
│   │       └── guest-speakers.html # Guest speaker information
│   └── 📅 events/                 # Event information
│       ├── boot-camp.html         # MUN boot camp details
│       ├── calendar.html          # Event calendar
│       └── forms.html             # Registration forms
├── 🎨 assets/                      # Static assets
│   ├── css/                       # Stylesheets
│   ├── js/                        # JavaScript files
│   ├── img/                       # Images and media
│   └── vendor/                    # Third-party libraries
├── 🔧 templates/                   # Template system (for future development)
│   ├── base-template.html         # Main page structure
│   ├── header.html               # Site header component
│   ├── navigation.html           # Navigation menu
│   └── footer.html               # Site footer component
├── 📋 forms/                       # Server-side forms
│   ├── contact.php               # Contact form handler
│   └── quote.php                 # Quote form handler
├── 📚 guides/                      # Background guides (PDF resources)
├── 📄 docs/                       # Documentation
└── 🛠️ scripts/                    # Utility scripts
    ├── fix-all-paths.py          # Path correction script
    ├── template-generator.js     # Template processing
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
- **Form Handling**: PHP-based contact and registration forms

## 🛠️ Technology Stack

### **Frontend**
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Bootstrap framework
- **JavaScript**: Interactive functionality and animations
- **Bootstrap 5**: Responsive grid system and components
- **AOS (Animate On Scroll)**: Scroll-triggered animations
- **Swiper**: Touch-enabled sliders and carousels
- **GLightbox**: Responsive lightbox gallery

### **Assets & Libraries**
- **Bootstrap Icons**: Comprehensive icon library
- **FontAwesome**: Additional icon sets
- **Google Fonts**: EB Garamond typography
- **PureCounter**: Animated counters
- **PHP**: Server-side form processing

### **Development Tools**
- **Python Scripts**: Automated path fixing and validation
- **Template System**: Modular HTML components
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
python -m http.server 8000

# Or use any static file server
npx serve .
```

### **Asset Path Management**
The website uses relative paths that automatically adjust based on directory depth:
- Root level: `assets/`
- One level deep: `../assets/`
- Two levels deep: `../../assets/`

### **Template System**
Templates are available in the `templates/` directory for future development:
- Use `scripts/template-generator.js` for processing
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

### **Known Issues**
- Some remaining files may have broken navigation links (e.g., Ad-Hoc.html)
- Temporary restructure files can be removed after final testing

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

*Last updated: August 2025 - After major website restructuring project*