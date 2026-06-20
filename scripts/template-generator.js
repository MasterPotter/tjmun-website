"use strict";
/**
 * TJMUN Website Template Generator
 * Generates HTML files from templates with variable substitution.
 */
const fs = require("fs");
const path = require("path");
class TemplateGenerator {
    constructor(templatesDir = "../templates", outputDir = "..") {
        this.templatesDir = templatesDir;
        this.outputDir = outputDir;
        this.templates = {};
        this.loadTemplates();
    }
    loadTemplates() {
        try {
            this.templates.base = this.readTemplate("base-template.html");
            this.templates.header = this.readTemplate("header.html");
            this.templates.navigation = this.readTemplate("navigation.html");
            this.templates.footer = this.readTemplate("footer.html");
        }
        catch (error) {
            console.error("Error loading templates:", error.message);
        }
    }
    readTemplate(fileName) {
        return fs.readFileSync(path.join(__dirname, this.templatesDir, fileName), "utf8");
    }
    /**
     * Generate navigation links based on current page depth.
     * depth 0 = root, 1 = pages/, 2 = pages/subfolder/.
     */
    generateNavigationLinks(depth = 0, activePage = "") {
        const prefix = "../".repeat(depth);
        return {
            HOME_LINK: `${prefix}index.html`,
            LEADERSHIP_LINK: `${prefix}pages/about/leadership.html`,
            CALENDAR_LINK: `${prefix}pages/events/calendar.html`,
            TECHMUN_LINK: `${prefix}pages/techmun/invitation.html`,
            INVITATION_LINK: `${prefix}pages/techmun/invitation.html`,
            REGISTRATION_LINK: `${prefix}pages/techmun/registration.html`,
            DIRECTORS_LINK: `${prefix}pages/techmun/directors.html`,
            COMMITTEES_LINK: `${prefix}pages/techmun/committees.html`,
            SCHEDULE_LINK: `${prefix}pages/techmun/schedule.html`,
            POSITION_PAPERS_LINK: `${prefix}pages/techmun/position-papers.html`,
            CONFERENCE_POLICIES_LINK: `${prefix}pages/techmun/conference-policies.html`,
            GUEST_SPEAKERS_LINK: `${prefix}pages/techmun/guest-speakers.html`,
            FORMS_LINK: `${prefix}pages/events/forms.html`,
            AWARDS_LINK: `${prefix}pages/about/awards.html`,
            ASSETS_PATH: prefix,
            HOME_ACTIVE: activePage === "home" ? 'class="active"' : "",
            LEADERSHIP_ACTIVE: activePage === "leadership" ? 'class="active"' : "",
            CALENDAR_ACTIVE: activePage === "calendar" ? 'class="active"' : "",
            FORMS_ACTIVE: activePage === "forms" ? 'class="active"' : "",
            AWARDS_ACTIVE: activePage === "awards" ? 'class="active"' : "",
        };
    }
    replaceVariables(template = "", variables) {
        return Object.entries(variables).reduce((result, [key, value]) => {
            const regex = new RegExp(`{{${key}}}`, "g");
            return result.replace(regex, String(value ?? ""));
        }, template);
    }
    generatePage(config) {
        const { pageTitle, mainContent, outputPath, depth = 0, activePage = "", pageSpecificStyles = "", additionalHeadContent = "", additionalScripts = "", } = config;
        const navVars = this.generateNavigationLinks(depth, activePage);
        const navigationContent = this.replaceVariables(this.templates.navigation, navVars);
        const headerContent = this.replaceVariables(this.templates.header, {
            ...navVars,
            NAVIGATION_CONTENT: navigationContent,
        });
        const footerContent = this.replaceVariables(this.templates.footer, navVars);
        const finalHtml = this.replaceVariables(this.templates.base, {
            PAGE_TITLE: pageTitle,
            MAIN_CONTENT: mainContent,
            HEADER_CONTENT: headerContent,
            FOOTER_CONTENT: footerContent,
            PAGE_SPECIFIC_STYLES: pageSpecificStyles,
            ADDITIONAL_HEAD_CONTENT: additionalHeadContent,
            ADDITIONAL_SCRIPTS: additionalScripts,
            ASSETS_PATH: navVars.ASSETS_PATH,
        });
        const fullOutputPath = path.join(__dirname, this.outputDir, outputPath);
        const outputDirectory = path.dirname(fullOutputPath);
        fs.mkdirSync(outputDirectory, { recursive: true });
        fs.writeFileSync(fullOutputPath, finalHtml, "utf8");
        console.log(`Generated: ${outputPath}`);
        return finalHtml;
    }
}
module.exports = TemplateGenerator;
if (require.main === module) {
    const generator = new TemplateGenerator();
    generator.generatePage({
        pageTitle: "Test Page",
        mainContent: '<div class="container"><h1>Test Content</h1></div>',
        outputPath: "test-generated.html",
        depth: 0,
        activePage: "home",
    });
}
