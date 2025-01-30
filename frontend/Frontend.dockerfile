#Stage 1
FROM node:23-alpine3.20 AS builder
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

# Stage 2
FROM nginx:latest
WORKDIR /var/www/html
COPY --from=builder /app/dist .
CMD ["nginx", "-g", "daemon off;"]