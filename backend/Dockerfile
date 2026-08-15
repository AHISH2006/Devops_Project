# ─────────────────────────────────────────────────────────────
#  Backend Dockerfile — Node.js 22 Alpine (production-ready)
#  Lightweight: ~180MB final image
# ─────────────────────────────────────────────────────────────

FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (layer caching — only re-runs if package.json changes)
COPY package*.json ./
RUN npm install --omit=dev

# Copy source code
COPY . .

# Expose the API port
EXPOSE 5000

# Health check — Jenkins/Docker Swarm uses this to know if the container is alive
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

# Start the server
CMD ["node", "server.js"]
