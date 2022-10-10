FROM node:14.17.0 as build-stage

ARG version
ENV REACT_APP_VERSION=$version

WORKDIR /app
COPY ./ .
RUN yarn
RUN REACT_APP_VERSION=${version} \
    yarn build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
ARG version
ENV REACT_APP_VERSION=$version
RUN echo "----- Building version $REACT_APP_VERSION -----"

COPY nginx.conf /etc/nginx/nginx.conf    