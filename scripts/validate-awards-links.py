#!/usr/bin/env python3
"""
Awards Page Link Validator
Tests all conference links from the awards page to ensure they work and have styling
"""

import re
import requests
from urllib.parse import urljoin, quote
import time

def test_awards_links():
    """Test all conference links from the awards page"""
    base_url = "http://localhost:8000/"
    awards_url = urljoin(base_url, "pages/about/closings.html")
    
    print("🔍 TJMUN Awards Page Link Validator")
    print("=" * 50)
    
    try:
        # Get the awards page content
        response = requests.get(awards_url, timeout=10)
        if response.status_code != 200:
            print(f"❌ Could not access awards page: {response.status_code}")
            return
        
        content = response.text
        
        # Extract all archive links
        archive_pattern = r'href="(\.\.\/conferences\/archives\/[^"]+\.html)"'
        archive_links = re.findall(archive_pattern, content)
        
        if not archive_links:
            print("❌ No archive links found in awards page")
            return
        
        print(f"Found {len(archive_links)} conference links to test")
        print()
        
        success_count = 0
        styled_count = 0
        
        for i, link in enumerate(archive_links, 1):
            # Convert relative path to full URL
            # Remove the "../" prefix and add proper base
            clean_link = link.replace("../", "pages/")
            test_url = urljoin(base_url, clean_link)
            
            # URL encode spaces
            test_url = test_url.replace(" ", "%20")
            
            try:
                # Test the link
                link_response = requests.get(test_url, timeout=5)
                status = link_response.status_code
                
                if status == 200:
                    success_count += 1
                    
                    # Check if CSS is loading
                    has_bootstrap = "bootstrap.min.css" in link_response.text
                    has_font = "EB Garamond" in link_response.text
                    
                    if has_bootstrap and has_font:
                        styled_count += 1
                        print(f"✅ {i:2d}. {link.split('/')[-1]:<25} [HTTP 200, Styled]")
                    else:
                        print(f"⚠️  {i:2d}. {link.split('/')[-1]:<25} [HTTP 200, No Styling]")
                else:
                    print(f"❌ {i:2d}. {link.split('/')[-1]:<25} [HTTP {status}]")
                    
            except requests.RequestException as e:
                print(f"❌ {i:2d}. {link.split('/')[-1]:<25} [Error: {str(e)[:30]}...]")
            
            # Small delay to avoid overwhelming the server
            time.sleep(0.1)
        
        print()
        print("📊 SUMMARY:")
        print(f"Total links tested: {len(archive_links)}")
        print(f"Working links (HTTP 200): {success_count}")
        print(f"Properly styled links: {styled_count}")
        
        if success_count == len(archive_links) and styled_count == len(archive_links):
            print("🎉 ALL AWARDS PAGE LINKS ARE WORKING AND STYLED!")
        elif success_count == len(archive_links):
            print("⚠️  All links work but some lack styling")
        else:
            print("❌ Some links are broken")
            
    except Exception as e:
        print(f"❌ Error testing awards page: {e}")

if __name__ == "__main__":
    test_awards_links()
