FROM node:12.12-alpine as builder
WORKDIR /var/app

ADD . /var/app
ADD ["package.json", "yarn.lock"] /var/app

RUN yarn install --production=true  && yarn next build
RUN mkdir www && cp -rfp package.json *.js .next node_modules static www/

FROM node:12.12-alpine as runtime
COPY --from=builder /var/app/www /var/www/
WORKDIR /var/www

CMD ["yarn", "start"]
