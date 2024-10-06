#Stage 1
FROM node:20-alpine3.17 AS builder
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install typescript
COPY . .
RUN npm run build

# Stage 2
FROM nginx:latest
WORKDIR /var/www/html
COPY --from=builder /app/build .
CMD ["nginx", "-g", "daemon off;"]