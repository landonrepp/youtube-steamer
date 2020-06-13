import requests
from urllib.parse import quote
from bs4 import BeautifulSoup
from urllib.parse import urlparse,parse_qs


def search(searchKey, tries = 0):
        def get_video_id(url):
                return parse_qs(urlparse(url).query).get('v','')[0]
        tries+=1
        url = 'https://www.youtube.com/results?search_query=' + quote(searchKey)
        print(url)
        request = requests.get(url)
        print(request.status_code)
        bs = BeautifulSoup(request.text,"html5lib")
        raw_videos = bs.find_all('div',attrs={'class':'yt-lockup-dismissable'})
        # if len(raw_videos) == 0:
        #         return search(searchKey,tries)
        # return str(raw_videos)
        return [
                {
                        'thumbnail': raw_video.find('img').get('data-thumb',None) if raw_video.find('img').get('data-thumb',None) else raw_video.find('img').get('src','None'),
                        'videoID' : get_video_id(raw_video.find('a',attrs={'class':'yt-uix-tile-link'}).get('href','')),
                        'title' : raw_video.find('a',attrs={'class':'yt-uix-tile-link'}).text,
                        'author' : raw_video.find('div',attrs={'class':'yt-lockup-byline'}).text
                }
                for raw_video in raw_videos
        ]