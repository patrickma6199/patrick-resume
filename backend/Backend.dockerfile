FROM node:current-alpine3.20
WORKDIR /app
ADD package.json .
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]