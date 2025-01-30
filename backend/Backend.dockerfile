FROM node:23-alpine3.20
WORKDIR /app
ADD package.json .
RUN yarn
COPY . .
RUN yarn build
CMD ["yarn", "start"]