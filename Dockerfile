FROM node:14.17.0 as build-stage
ARG BUILD_VERSION
ENV VUE_APP_VERSION=$BUILD_VERSION
WORKDIR /app
COPY ./ .
RUN yarn
RUN yarn build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf