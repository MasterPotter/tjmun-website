#!/usr/bin/env python3
"""
Awards Page Link Validator
Tests all conference links from the awards page to ensure they work and have styling
"""

import re
import time
from urllib.error import URLError
from urllib.parse import urljoin
from urllib.request import urlopen


def fetch_url(url, timeout=10):
    """Fetch a URL with stdlib tools so the validator has no external dependencies."""
    with urlopen(url, timeout=timeout) as response:
        return response.status, response.read().decode("utf-8", errors="replace")

def test_awards_links():
    """Test all conference links from the awards page"""
    base_url = "http://localhost:8000/"
    awards_url = urljoin(base_url, "pages/about/awards.html")
    
    print("🔍 TJMUN Awards Page Link Validator")
    print("=" * 50)
    
    try:
        # Get the awards page content
        status, content = fetch_url(awards_url, timeout=10)
        if status != 200:
            print(f"❌ Could not access awards page: {status}")
            return

        # Extract all archive links
        archive_pattern = r'href="([^"]*pages/archives/[^"]+\.html)"'
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
            clean_link = link.lstrip("/")
            test_url = urljoin(base_url, clean_link)
            
            # URL encode spaces
            test_url = test_url.replace(" ", "%20")
            
            try:
                # Test the link
                status, link_content = fetch_url(test_url, timeout=5)

                if status == 200:
                    success_count += 1

                    # Check if CSS is loading
                    has_bootstrap = "bootstrap.min.css" in link_content
                    has_font = "EB Garamond" in link_content
                    
                    if has_bootstrap and has_font:
                        styled_count += 1
                        print(f"✅ {i:2d}. {link.split('/')[-1]:<25} [HTTP 200, Styled]")
                    else:
                        print(f"⚠️  {i:2d}. {link.split('/')[-1]:<25} [HTTP 200, No Styling]")
                else:
                    print(f"❌ {i:2d}. {link.split('/')[-1]:<25} [HTTP {status}]")
                    
            except URLError as e:
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
