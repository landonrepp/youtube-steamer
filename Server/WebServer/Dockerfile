FROM python:3.7.5-alpine

RUN adduser -D landonrepp

WORKDIR /home/landonrepp

COPY . ./
RUN apk add --no-cache --update \
    python3 python3-dev gcc \
    gfortran musl-dev

RUN apk add git
RUN apk add youtube-dl

RUN pip install --upgrade pip
RUN python -m venv youtube_streamer_env
RUN source youtube_streamer_env/bin/activate
RUN youtube_streamer_env/bin/pip install -r requirements.txt
RUN youtube_streamer_env/bin/pip install gunicorn
# RUN youtube_streamer_env/bin/pip install paffy
# RUN youtube_streamer_env/bin/pip uninstall paffy
RUN youtube_streamer_env/bin/pip install git+https://github.com/landonrepp/pafy.git@bugfix-Ytdl.Pafy._fetch_basic-crashes-if-thumbnail-doesnt-exist#egg=pafy


COPY app.py app.py
COPY boot.sh boot.sh

# COPY migrations migrations
# COPY app.py config.py boot.sh ./
RUN chmod +x ./boot.sh

ENV FLASK_APP app.py

RUN chown -R landonrepp:landonrepp ./
USER landonrepp

EXPOSE 5000

ENTRYPOINT ["./boot.sh"]
