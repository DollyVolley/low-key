#!/bin/bash

IMAGE_NAME="bodywithoutorgans/low-key"

TAG="$(node -pe "require('./package.json')['version']")"
echo $TAG lel

REGISTRY="hub.docker.com"

docker build -t ${IMAGE_NAME}:${TAG} -t ${IMAGE_NAME}:latest .
docker push ${IMAGE_NAME}
