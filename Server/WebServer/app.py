from flask import Flask, Response, jsonify
from flask_cors import CORS
from flask import request
import pafy
# from youtube_api import YouTubeDataAPI
import constants
import SearchYoutube

app = Flask(__name__)
#fully opened cors for now. i eventually want to only open it to my app url
CORS(app)

# yt = YouTubeDataAPI(constants.GOOGLE_DATA_API_KEY)

@app.route('/')
def hello_world():
    return 'server running@'

@app.route('/youtube')
def youtube():
    video_id = request.args.get('v',None)
    # video_format = request.args.get('f','mp3')
    if not video_id:
        return Response(404,"bad bad video id")
    
    video_url = "https://www.youtube.com/watch?v=%s"%video_id
    video = pafy.new(video_url)
    bestaudio = video.getbestaudio()
    
    return jsonify({
        'url':bestaudio.url,
        'ext':bestaudio.extension
    })

# TODO: set this up to not use the youtube api. it's too limited on daily requests. maybe web scraping?
@app.route('/video')
def video():
    search_key = request.args.get('s','music')
    return jsonify(SearchYoutube.search(search_key))