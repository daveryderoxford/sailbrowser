import requests
from bs4 import BeautifulSoup
import pandas as pd
import urllib.parse

# Configuration
BASE_URL = "https://www.islandbarn.org.uk"
INDEX_URL = f"{BASE_URL}/sailing-club/1955/current-series.html"
HEADERS = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

def get_direct_links():
    print("Fetching series links...")
    resp = requests.get(INDEX_URL, headers=HEADERS)
    soup = BeautifulSoup(resp.content, 'html.parser')
    links = []
    for a in soup.find_all('a', href=True):
        if 'sailwave.php?u=' in a['href']:
            internal_path = a['href'].split('sailwave.php?u=')[-1].lstrip('/')
            links.append(urllib.parse.unquote(f"{BASE_URL}/{internal_path}"))
    return list(set(links))

def scrape_ratings(url):
    print(f"Checking: {url.split('/')[-1]}")
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        soup = BeautifulSoup(resp.content, 'html.parser')
        table = soup.find('table', {'class': 'summarytable'})
        if not table: return []

        headers = [th.text.strip() for th in table.find_all('th')]
        
        # Identify columns
        idx_class = -1
        idx_rating = -1
        for i, h in enumerate(headers):
            if 'class' in h.lower(): idx_class = i
            if 'rating' in h.lower() or 'py' in h.lower() or 'hcp' in h.lower(): 
                idx_rating = i

        if idx_class == -1 or idx_rating == -1:
            return []

        rows_data = []
        for row in table.find_all('tr')[1:]:
            cells = row.find_all('td')
            if len(cells) > max(idx_class, idx_rating):
                rows_data.append({
                    'Class': cells[idx_class].text.strip(),
                    'Rating': cells[idx_rating].text.strip()
                })
        return rows_data
    except:
        return []

# Run
series_links = get_direct_links()
all_ratings = []

for link in series_links:
    all_ratings.extend(scrape_ratings(link))

if all_ratings:
    df = pd.DataFrame(all_ratings)
    # Get unique pairs of Class and Rating
    df_unique = df.drop_duplicates().sort_values(by='Class')
    
    output_file = "IBRSC_Class_Ratings.csv"
    df_unique.to_csv(output_file, index=False)
    print(f"\nDone! Saved {len(df_unique)} unique class ratings to {output_file}")
else:
    print("No ratings found.")