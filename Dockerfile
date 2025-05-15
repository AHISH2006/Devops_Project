# Stage 1: Build React app
FROM node:18 AS builder
WORKDIR /app

# Install dependencies and build React app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the build using Node.js (or alternatively NGINX)
FROM node:18 AS server
WORKDIR /app

COPY --from=builder /app /app

# Install only server dependencies
RUN npm install --omit=dev

# Expose port and start server
EXPOSE 3000
CMD ["node", "server.js"]
