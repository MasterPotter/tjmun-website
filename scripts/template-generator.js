/**
 * TJMUN Website Template Generator
 * Generates HTML files from templates with variable substitution
 */

const fs = require('fs');
const path = require('path');

class TemplateGenerator {
    constructor(templatesDir = '../templates', outputDir = '..') {
        this.templatesDir = templatesDir;
        this.outputDir = outputDir;
        this.templates = {};
        this.loadTemplates();
    }

    loadTemplates() {
        // Load all template files
        try {
            this.templates.base = fs.readFileSync(path.join(__dirname, this.templatesDir, 'base-template.html'), 'utf8');
            this.templates.header = fs.readFileSync(path.join(__dirname, this.templatesDir, 'header.html'), 'utf8');
            this.templates.navigation = fs.readFileSync(path.join(__dirname, this.templatesDir, 'navigation.html'), 'utf8');
            this.templates.footer = fs.readFileSync(path.join(__dirname, this.templatesDir, 'footer.html'), 'utf8');
        } catch (error) {
            console.error('Error loading templates:', error.message);
        }
    }

    /**
     * Generate navigation links based on current page depth
     * @param {number} depth - Directory depth (0 = root, 1 = pages/, 2 = pages/subfolder/)
     * @param {string} activePage - Which navigation item should be active
     */
    generateNavigationLinks(depth = 0, activePage = '') {
        const prefix = '../'.repeat(depth);
        
        return {
            HOME_LINK: `${prefix}index.html`,
            LEADERSHIP_LINK: `${prefix}pages/about/leadership.html`,
            CALENDAR_LINK: `${prefix}pages/events/calendar.html`,
            TECHMUN_LINK: `${prefix}pages/conferences/techmun/index.html`,
            INVITATION_LINK: `${prefix}pages/conferences/techmun/invitation.html`,
            REGISTRATION_LINK: `${prefix}pages/conferences/techmun/registration.html`,
            DIRECTORS_LINK: `${prefix}pages/conferences/techmun/directors.html`,
            COMMITTEES_LINK: `${prefix}pages/conferences/techmun/committees.html`,
            SCHEDULE_LINK: `${prefix}pages/conferences/techmun/schedule.html`,
            POSITION_PAPERS_LINK: `${prefix}pages/conferences/techmun/position-papers.html`,
            CONFERENCE_POLICIES_LINK: `${prefix}pages/conferences/techmun/conference-policies.html`,
            GUEST_SPEAKERS_LINK: `${prefix}pages/conferences/techmun/guest-speakers.html`,
            FORMS_LINK: `${prefix}pages/events/forms.html`,
            AWARDS_LINK: `${prefix}pages/about/awards.html`,
            ASSETS_PATH: prefix,
            
            // Active states
            HOME_ACTIVE: activePage === 'home' ? 'class="active"' : '',
            LEADERSHIP_ACTIVE: activePage === 'leadership' ? 'class="active"' : '',
            CALENDAR_ACTIVE: activePage === 'calendar' ? 'class="active"' : '',
            FORMS_ACTIVE: activePage === 'forms' ? 'class="active"' : '',
            AWARDS_ACTIVE: activePage === 'awards' ? 'class="active"' : ''
        };
    }

    /**
     * Replace template variables with actual values
     * @param {string} template - Template content
     * @param {object} variables - Key-value pairs for replacement
     */
    replaceVariables(template, variables) {
        let result = template;
        
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(regex, value || '');
        }
        
        return result;
    }

    /**
     * Generate a complete HTML page from templates
     * @param {object} config - Page configuration
     */
    generatePage(config) {
        const {
            pageTitle,
            mainContent,
            outputPath,
            depth = 0,
            activePage = '',
            pageSpecificStyles = '',
            additionalHeadContent = '',
            additionalScripts = ''
        } = config;

        // Generate navigation variables
        const navVars = this.generateNavigationLinks(depth, activePage);
        
        // Prepare navigation content
        const navigationContent = this.replaceVariables(this.templates.navigation, navVars);
        
        // Prepare header content
        const headerVars = {
            ...navVars,
            NAVIGATION_CONTENT: navigationContent
        };
        const headerContent = this.replaceVariables(this.templates.header, headerVars);
        
        // Prepare footer content
        const footerContent = this.replaceVariables(this.templates.footer, navVars);
        
        // Prepare final page variables
        const pageVars = {
            PAGE_TITLE: pageTitle,
            MAIN_CONTENT: mainContent,
            HEADER_CONTENT: headerContent,
            FOOTER_CONTENT: footerContent,
            PAGE_SPECIFIC_STYLES: pageSpecificStyles,
            ADDITIONAL_HEAD_CONTENT: additionalHeadContent,
            ADDITIONAL_SCRIPTS: additionalScripts,
            ASSETS_PATH: navVars.ASSETS_PATH
        };

        // Generate final HTML
        const finalHtml = this.replaceVariables(this.templates.base, pageVars);
        
        // Write to file
        const fullOutputPath = path.join(__dirname, this.outputDir, outputPath);
        
        // Ensure directory exists
        const outputDir = path.dirname(fullOutputPath);
        fs.mkdirSync(outputDir, { recursive: true });
        
        // Write file
        fs.writeFileSync(fullOutputPath, finalHtml, 'utf8');
        console.log(`Generated: ${outputPath}`);
        
        return finalHtml;
    }
}

module.exports = TemplateGenerator;

// Example usage if run directly
if (require.main === module) {
    const generator = new TemplateGenerator();
    
    // Example: Generate a simple page
    generator.generatePage({
        pageTitle: 'Test Page',
        mainContent: '<div class="container"><h1>Test Content</h1></div>',
        outputPath: 'test-generated.html',
        depth: 0,
        activePage: 'home'
    });
}
