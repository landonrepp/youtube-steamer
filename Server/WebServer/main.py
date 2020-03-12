from flask import Flask, Response
from flask import request, stream_with_context
import youtube_dl
from os import path, fstat
import mimetypes
import re
from flask_mysqldb import MySQL
import json
from csv import writer
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'landonrepp'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'Player'
mysql = MySQL(app)


SAVE_PATH = "../Videos"

filetype = {
    "mp3":"audio/mp3"
}

ydl_opts = {
   'outtmpl': 'Server/Videos/%(id)s'+'.%(ext)s',
   'format': 'bestaudio/best',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192'
    }]
}

def get_table(sql):
    cursor = mysql.connection.cursor()
    cursor.execute(sql)
    tbl = cursor.fetchall()
    field_names = [i[0] for i in cursor.description]
    cursor.close()
    tbl = list(tbl)
    print(tbl)
    tbl.insert(0,field_names)
    return json.dumps(tbl)

@app.after_request
def after_request(response):
    response.headers.add('Accept-Ranges', 'bytes')
    return response

@app.route("/youtube")
def downloadVid():
    video_id = request.args.get('v','')
    video_format = request.args.get('f','mp3')
    video_file_name = 'Server/Videos/%s.%s'%(video_id,video_format)
    
    if not path.exists(video_file_name):
        video_url = "https://www.youtube.com/watch?v=%s"%video_id
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(video_url)
            # print(info_dict.keys())
            sql = """insert into tblFiles(files, videoID, ext, fileName, title, thumbnail, author)
            values ('%s', '%s', '%s', '%s', '%s', '%s', '%s')""" %(info_dict["title"], info_dict["id"], video_format, '%s.%s'%(video_id,video_format),info_dict["title"],info_dict["thumbnail"], info_dict["uploader"])
            print(sql)
            cursor = mysql.connection.cursor()
            cursor.execute(sql)
            mysql.connection.commit()
            cursor.close()

    if not path.exists(video_file_name):
        return 404,404

    range_header = request.headers.get('Range', None)

    if not range_header:
        with open(video_file_name, 'rb') as mf:
            data = mf.read()
        return Response(data, 206, mimetype="audio/mp3", direct_passthrough=True)

    m = re.search('(\d+)-(\d*)', range_header)
    
    g = m.groups()
    byte1, byte2 = 0, None
    if g[0]:
        byte1 = int(g[0])
    if g[1]:
        byte2 = int(g[1])

    with open(video_file_name, 'rb') as mf:
        size = fstat(mf.fileno()).st_size
        length = size - byte1
        mf.seek(byte1)
        data = mf.read()
    
    rv = Response(data, 206, mimetype="audio/mp3", direct_passthrough=True)
    
    rv.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(byte1, byte1 + length - 1, size))
    return rv

@app.route("/getvideo")
def getVidInfo():
    video_id = request.args.get('v',None)
    search = request.args.get('s',None)
    if video_id:
        sql = "select * from tblFiles where filesID = '%s' limit 20" % video_id
    elif search:
        sql = "select * from tblFiles where search like '%{}%' limit 20".format(search)
    else:
        sql = "select * from tblFiles limit 20"
    
    data = get_table(sql)

    return str(json.loads(data)[1:]) #data is a string with a 2d array. headers are in the first 


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)