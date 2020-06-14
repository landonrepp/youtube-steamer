#!/bin/sh
echo 'test'

echo $PWD
activate () {
    . youtube_streamer_env/bin/activate
}
activate
# flask db upgrade
# flask translate compile
gunicorn -b :5000 --access-logfile access --error-logfile errors wsgi:app