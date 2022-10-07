FROM node:14.17.0 as build-stage

ARG version
ENV REACT_VERSION=$version
RUN echo "----- Building version $REACT_VERSION -----"

WORKDIR /app
COPY ./ .
RUN yarn
RUN yarn build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf