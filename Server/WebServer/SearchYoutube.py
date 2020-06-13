import requests
from urllib.parse import quote
from bs4 import BeautifulSoup

def search(searchKey):
        url = 'https://www.youtube.com/results?search_query=' + quote(searchKey)
        request = requests.get(url)
        bs = BeautifulSoup(request.text)
        print(bs.prettify())
        return bs.prettify()