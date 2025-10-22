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

# Kubernetes Command

## Restart the pod
kubectl rollout restart deployment <pod_name> -n servername
## Exec to Pod
kubectl exec -it <pod_name> -n servername - /bin/sh
## To get the live logs
kubectl logs <pod_name> -n servername
## To get all pod list
kubectl get pod -n servername
## To get a pod details
kubectl get pod -n servername|grep -i <pod_name>
## To get property file
kubectl get cm -n servername | grep cms
## To read the file
kubectl describe cm config-cms -n servername
## To edit propertfile
kubectl edit cm config-cms -n servername
