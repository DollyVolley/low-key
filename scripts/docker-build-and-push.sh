#!/bin/bash

IMAGE_NAME="bodywithoutorgans/low-key"

VERSION="$(node -pe "require('./package.json')['version']")"
echo $VERSION 

REGISTRY="hub.docker.com"

docker build -t ${IMAGE_NAME}:${VERSION} -t ${IMAGE_NAME}:latest --build-arg version=$VERSION . 
docker push ${IMAGE_NAME}
