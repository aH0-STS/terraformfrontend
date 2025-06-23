# Stage 1: Build Angular App
FROM node:18.19 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

# Set legacy OpenSSL provider
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Angular dist files from builder
COPY --from=builder /app/dist/employee-rest-frontend /usr/share/nginx/html

# Copy custom Nginx config (to support Angular routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
