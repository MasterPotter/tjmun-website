#!/usr/bin/env python3
"""
TJMUN Website Path Fixer
Systematically fixes all asset paths and navigation links in migrated pages
"""

import os
import re
import glob

def count_directory_depth(file_path):
    """Count how many directories deep a file is from the root"""
    # Remove the filename and count directory separators
    dir_path = os.path.dirname(file_path)
    if not dir_path or dir_path == '.':
        return 0
    return len([d for d in dir_path.split('/') if d and d != 'pages'])

def get_asset_prefix(depth):
    """Get the correct relative path prefix for assets based on depth"""
    if depth == 0:
        return ""
    elif depth == 1:
        return "../"
    elif depth == 2:
        return "../../"
    elif depth == 3:
        return "../../../"
    elif depth == 4:
        return "../../../../"
    else:
        return "../" * depth

def get_navigation_links(depth):
    """Get navigation link mappings based on directory depth"""
    prefix = get_asset_prefix(depth)
    
    # Navigation links that should point to the organized structure
    nav_links = {
        'href="index.html"': f'href="{prefix}index.html"',
        'href="Leadership.html"': f'href="{prefix}pages/about/leadership.html"',
        'href="Calendar.html"': f'href="{prefix}pages/events/calendar.html"',
        'href="Forms.html"': f'href="{prefix}pages/events/forms.html"',
        'href="Awards.html"': f'href="{prefix}pages/about/awards.html"',
        'href="Invitation.html"': f'href="{prefix}pages/conferences/techmun/invitation.html"',
        'href="Registration.html"': f'href="{prefix}pages/conferences/techmun/registration.html"',
        'href="Directors.html"': f'href="{prefix}pages/conferences/techmun/directors.html"',
        'href="Committees.html"': f'href="{prefix}pages/conferences/techmun/committees.html"',
        'href="Schedule.html"': f'href="{prefix}pages/conferences/techmun/schedule.html"',
        'href="Position_Papers.html"': f'href="{prefix}pages/conferences/techmun/position-papers.html"',
        'href="Conference_Policies.html"': f'href="{prefix}pages/conferences/techmun/conference-policies.html"',
        'href="Guest_Speakers.html"': f'href="{prefix}pages/conferences/techmun/guest-speakers.html"',
        'href="TECHMUN.html"': f'href="{prefix}pages/conferences/techmun/index.html"',
    }
    
    # Special handling for files within the TECHMUN directory
    if "pages/conferences/techmun/" in prefix or depth == 3:
        nav_links.update({
            'href="Invitation.html"': 'href="invitation.html"',
            'href="Registration.html"': 'href="registration.html"',
            'href="Directors.html"': 'href="directors.html"',
            'href="Committees.html"': 'href="committees.html"',
            'href="Schedule.html"': 'href="schedule.html"',
            'href="Position_Papers.html"': 'href="position-papers.html"',
            'href="Conference_Policies.html"': 'href="conference-policies.html"',
            'href="Guest_Speakers.html"': 'href="guest-speakers.html"',
            'href="TECHMUN.html"': 'href="index.html"',
        })
    
    return nav_links

def fix_file_paths(file_path):
    """Fix all paths in a single HTML file"""
    print(f"Fixing: {file_path}")
    
    # Read the file
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False
    
    # Calculate directory depth
    depth = count_directory_depth(file_path)
    asset_prefix = get_asset_prefix(depth)
    
    # Fix asset paths (CSS, JS, images)
    content = re.sub(r'href="assets/', f'href="{asset_prefix}assets/', content)
    content = re.sub(r'src="assets/', f'src="{asset_prefix}assets/', content)
    
    # Fix navigation links
    nav_links = get_navigation_links(depth)
    for old_link, new_link in nav_links.items():
        content = content.replace(old_link, new_link)
    
    # Write the file back
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Fixed: {file_path} (depth: {depth})")
        return True
    except Exception as e:
        print(f"Error writing {file_path}: {e}")
        return False

def main():
    """Main function to fix all HTML files in the pages directory"""
    print("🔧 TJMUN Website Path Fixer")
    print("=" * 50)
    
    # Find all HTML files in the pages directory
    html_files = glob.glob("pages/**/*.html", recursive=True)
    
    if not html_files:
        print("No HTML files found in pages directory")
        return
    
    print(f"Found {len(html_files)} HTML files to fix")
    print()
    
    fixed_count = 0
    for file_path in sorted(html_files):
        if fix_file_paths(file_path):
            fixed_count += 1
    
    print()
    print(f"✅ Successfully fixed {fixed_count}/{len(html_files)} files")
    print("🎉 All migrated pages should now have correct styling!")

if __name__ == "__main__":
    main()
