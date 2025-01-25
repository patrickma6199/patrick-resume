#Stage 1
FROM node:current-alpine3.20 AS builder
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

# Stage 2
FROM nginx:latest
WORKDIR /var/www/html
COPY --from=builder /app/dist .
CMD ["nginx", "-g", "daemon off;"]