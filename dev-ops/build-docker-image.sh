#!/bin/bash
pwd  
docker build -t $1 . 
docker tag $1:latest $2/$1:latest