#Stage 1
FROM node:20-alpine3.17 AS builder
WORKDIR /app
COPY package.json .
RUN yarn install
RUN yarn add typescript
COPY . .
RUN yarn build

# Stage 2
FROM nginx:latest
WORKDIR /var/www/html
COPY --from=builder /app/dist .
CMD ["nginx", "-g", "daemon off;"]