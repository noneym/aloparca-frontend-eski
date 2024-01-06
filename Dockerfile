FROM node:12.12-alpine as builder

WORKDIR /var/app
ADD . /var/app
ADD ["package.json", "yarn.lock"] /var/app

# Install all dependencies including devDependencies
RUN yarn install && yarn next build

RUN mkdir www && cp -rfp package.json *.js .next node_modules static www/

# Set build arguments from .env variables
ARG BASE_URL
ARG API_URL
ARG GOOGLE_MAPS_KEY
ARG NODE_ENV=production

# Set environment variables
ENV BASE_URL=$BASE_URL
ENV API_URL=$API_URL
ENV GOOGLE_MAPS_KEY=$GOOGLE_MAPS_KEY
ENV NODE_ENV=$NODE_ENV

FROM node:12.12-alpine as runtime

COPY --from=builder /var/app/www /var/www/
WORKDIR /var/www

CMD ["yarn", "start"]
