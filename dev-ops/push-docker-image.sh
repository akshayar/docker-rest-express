#!/bin/bash
pwd  
echo push latest Docker images to ECR...
docker push $2/$1:latest