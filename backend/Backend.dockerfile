FROM node:current-alpine3.20
ARG SOURCE

RUN mkdir /app
WORKDIR /app
ADD package.json /app
ADD common /app/common
ADD $SOURCE /app/$SOURCE
RUN yarn install
RUN yarn build
WORKDIR /app/$SOURCE
CMD ["yarn", "start"]