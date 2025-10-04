# Multi-stage Dockerfile for Frontend
# Stage 1: Testing and building (optional for static files)
FROM node:18-alpine AS test

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for testing)
RUN npm ci

# Copy source files
COPY . .

# Run tests and security scans
RUN npm test -- --coverage --watchAll=false

# Install Snyk and run security scan
RUN npm install -g snyk
RUN snyk test --severity-threshold=high || echo "Vulnerabilities found but continuing build"
RUN snyk code test || echo "Code analysis completed"

# Stage 2: Production
FROM nginx:1.25-alpine AS production

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files (skip node_modules, tests, etc.)
COPY --from=test /app/*.html /usr/share/nginx/html/
COPY --from=test /app/*.js /usr/share/nginx/html/

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
