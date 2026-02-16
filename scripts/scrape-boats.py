import requests
from bs4 import BeautifulSoup
import pandas as pd
import urllib.parse
import re

# Configuration
BASE_URL = "https://www.islandbarn.org.uk"
INDEX_URL = f"{BASE_URL}/sailing-club/1955/current-series.html"
HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

def get_direct_links():
    print("Step 1: Finding all series links on the main page...")
    try:
        resp = requests.get(INDEX_URL, headers=HEADERS)
        soup = BeautifulSoup(resp.content, 'html.parser')
        links = []
        
        for a in soup.find_all('a', href=True):
            href = a['href']
            # Look for the sailwave wrapper
            if 'sailwave.php?u=' in href:
                # Clean up the internal path
                internal_path = href.split('sailwave.php?u=')[-1]
                # Remove leading double slashes if they exist
                internal_path = internal_path.lstrip('/')
                full_url = f"{BASE_URL}/{internal_path}"
                # Unquote URL (turns %20 into spaces)
                links.append(urllib.parse.unquote(full_url))
        
        unique_links = list(set(links))
        print(f"Found {len(unique_links)} potential results pages.\n")
        return unique_links
    except Exception as e:
        print(f"Error fetching index: {e}")
        return []

def scrape_table(url):
    print(f"Reading: {url.split('/')[-1]}")
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        # Use 'lxml' if installed, otherwise 'html.parser' is fine
        soup = BeautifulSoup(resp.content, 'html.parser')
        table = soup.find('table', {'class': 'summarytable'})
        
        if not table:
            return []

        # Find column indices dynamically
        headers = [th.text.strip() for th in table.find_all('th')]
        
        # Helper to find column index even if names vary slightly
        def get_idx(target):
            for i, h in enumerate(headers):
                if target.lower() in h.lower(): return i
            return -1

        idx_class = get_idx('Class')
        idx_sail  = get_idx('SailNo')
        idx_helm  = get_idx('HelmName')
        idx_crew  = get_idx('CrewName')

        rows_data = []
        for row in table.find_all('tr')[1:]:
            cells = row.find_all('td')
            if len(cells) < 3: continue
            
            rows_data.append({
                'Class': cells[idx_class].text.strip() if idx_class != -1 else "Unknown",
                'SailNo': cells[idx_sail].text.strip() if idx_sail != -1 else "Unknown",
                'HelmName': cells[idx_helm].text.strip() if idx_helm != -1 else "Unknown",
                'CrewName': cells[idx_crew].text.strip() if idx_crew != -1 else ""
            })
        return rows_data
    except Exception as e:
        print(f"   ! Skipping this page (likely not a standard results table).")
        return []

# --- Main Execution ---
all_results = []
series_links = get_direct_links()

for link in series_links:
    data = scrape_table(link)
    all_results.extend(data)

if all_results:
    df = pd.DataFrame(all_results)
    # Remove exact duplicates of Boat + Person
    df_unique = df.drop_duplicates(subset=['Class', 'SailNo', 'HelmName'])
    
    # Save to CSV
    output_file = "IBRSC_Unique_Entries.csv"
    df_unique.to_csv(output_file, index=False)
    print(f"\nSuccess! Processed {len(all_results)} total entries.")
    print(f"Created '{output_file}' with {len(df_unique)} unique boat/helm combinations.")
else:
    print("No data found. Check your internet connection or the URL.")