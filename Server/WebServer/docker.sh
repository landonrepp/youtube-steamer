docker stop $(docker ps -q) || echo 'no previous values'
docker build --tag youtube:latest .
docker run -p 5000:5000 -d youtube:latest
