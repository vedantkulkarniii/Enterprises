FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY apps/frontend/package.json ./apps/frontend/

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/frontend ./apps/frontend

# Build the application
RUN npm run build --workspace @enterprise-platform/frontend

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve to run the app
RUN npm install -g serve

# Copy built application
COPY --from=builder /app/apps/frontend/dist ./dist

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]
