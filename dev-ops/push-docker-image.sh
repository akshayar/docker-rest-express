#!/bin/bash
pwd  
echo push latest Docker images to ECR...
docker push $2/$1:latest
printf '[{"name":"$1","imageUri":"$2/$1:latest"}]' > $1.json