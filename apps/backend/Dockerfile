FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/tsconfig.json ./apps/backend/

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/backend ./apps/backend

# Build the application
RUN npm run build --workspace @enterprise-platform/backend

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/main.js"]
