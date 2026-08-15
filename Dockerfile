# Stage 1 – Build the React app
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .
RUN npm run build   # This creates the /app/build folder by default in React

# Stage 2 – Serve using NGINX
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# (Optional) Copy custom nginx config (if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (since NGINX listens on port 80)
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
