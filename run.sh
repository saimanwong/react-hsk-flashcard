#!/bin/bash

docker run -it --rm --name react-app -p 3000:3000 -v $PWD/app:/app -w /app node:latest bash
