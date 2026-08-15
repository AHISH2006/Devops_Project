# ─────────────────────────────────────────────────────────────
#  Stage 1 — Build the React app with Vite
# ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Cache npm install layer
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build
# Vite outputs to /app/dist (NOT /app/build)

# ─────────────────────────────────────────────────────────────
#  Stage 2 — Serve with NGINX Alpine (~20MB final image)
# ─────────────────────────────────────────────────────────────
FROM nginx:alpine

# Remove default NGINX static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite production build from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom NGINX config for SPA routing (React Router support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Expose HTTP port
EXPOSE 80

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
