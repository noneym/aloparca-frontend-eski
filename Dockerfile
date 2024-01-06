# TODO: change to lts when 16 becomes LTS
# TODO: change to lts when 16 becomes LTS 2
FROM node:16-slim AS builder

WORKDIR /app

# Since we are connecting to our Sentry instance, we need to have SSL certificates available.
RUN apt update && apt install ca-certificates -y

# Copy your code into the Docker image
COPY . /app

# Install packages
COPY package.json yarn.lock ./
RUN yarn

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

# Build Next.js files
RUN yarn install --production=true  && yarn next build
RUN mkdir www && cp -rfp package.json *.js .next node_modules static www/

FROM node:16-alpine AS runtime

COPY --from=builder /var/app/www /var/www/
WORKDIR /var/www


# Run the frontend!
CMD ["yarn", "start"]
