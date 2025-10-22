# Docker Command

## To get the status and info for all docker
sudo docker ps -a
## To get the info of particular docker
sudo docker ps -a|grep -i "<microservice name>"
## To execute docker
sudo docker exec -it <dockerid> /bin/sh
## To restar
sudo docker restart <dockerid>
## For Logs
sudo docker logs <dockerid>
## For live logs
sudo docker logs -f <dockerid>
## Build & run container
docker build -t my-node-service
docker run -p 3000:3000 my-node-service
