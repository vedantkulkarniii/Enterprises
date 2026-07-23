# Enterprise Platform - Complete Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Docker Development Environment](#docker-development-environment)
4. [Database Setup](#database-setup)
5. [Backend Development](#backend-development)
6. [Frontend Development](#frontend-development)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20+)
- **CPU**: 4+ cores
- **RAM**: 8GB minimum (16GB recommended)
- **Disk**: 20GB free space

### Required Software

```bash
# Node.js (LTS or Latest)
node --version  # Should be v20+
npm --version   # Should be v10+

# Docker & Docker Compose
docker --version
docker-compose --version

# Git
git --version

# PostgreSQL CLI (optional, for direct DB access)
psql --version

# Redis CLI (optional, for cache inspection)
redis-cli --version
```

### Installation Links
- **Node.js**: https://nodejs.org/ (v20 LTS recommended)
- **Docker Desktop**: https://www.docker.com/products/docker-desktop
- **Git**: https://git-scm.com/

---

## Initial Setup

### Step 1: Clone Repository

```bash
# Clone the repository
git clone <repository-url>
cd enterprise-platform

# Verify structure
ls -la
# Should see: apps/, packages/, docker-compose.yml, package.json, etc.
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Verify turbo installation
npx turbo --version
```

### Step 3: Environment Configuration

```bash
# Backend environment
cd apps/backend
cp .env.example .env.local

# Update .env.local with your values:
# - JWT_SECRET: Generate a strong random string
# - DATABASE_URL: Will be set by Docker
# - REDIS_HOST: Will be "redis" when using Docker

# Frontend environment
cd ../frontend
cp .env.example .env.local

# Update VITE_API_URL if needed:
# VITE_API_URL=http://localhost:3000/api
```

### Step 4: Verify Node Modules

```bash
# Check if all dependencies are installed
npm ls --depth=0

# If issues, try:
npm ci  # Clean install
```

---

## Docker Development Environment

### Step 1: Start Docker Services

```bash
# From root directory
docker-compose up -d

# Verify containers are running
docker ps

# Expected output should show:
# - enterprise-postgres
# - enterprise-redis
# - (api and web will start after we run them)
```

### Step 2: Check Service Health

```bash
# Check PostgreSQL
docker exec enterprise-postgres pg_isready -U postgres

# Check Redis
docker exec enterprise-redis redis-cli ping
# Should return: PONG

# View logs
docker-compose logs -f postgres
docker-compose logs -f redis
```

### Step 3: Verify Connection

```bash
# Test PostgreSQL connection
psql postgresql://postgres:postgres@localhost:5432/enterprise_platform_dev

# If connected, type: \q to exit

# Test Redis connection
redis-cli -h localhost ping
# Should return: PONG
```

---

## Database Setup

### Step 1: Configure Database URL

```bash
cd apps/backend

# Verify .env.local has:
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/enterprise_platform_dev
REDIS_HOST=localhost
```

### Step 2: Run Prisma Migrations

```bash
# From apps/backend directory

# Create and apply migrations
npm run db:migrate

# Output should show:
# ✔ Create migration ... 
# ✔ Apply migration 20xx_xxx_init
# ✔ Generated Prisma Client
```

### Step 3: Verify Schema

```bash
# Open Prisma Studio
npm run db:studio

# Opens http://localhost:5555 in browser
# You can view all tables and their relationships
```

### Step 4: Seed Database (Optional)

```bash
# If seed file exists
npm run db:seed

# This populates initial data:
# - System roles
# - Admin user
# - Demo organizations
# - Sample projects
```

### Step 5: Check Database Structure

```bash
# Connect to database
psql postgresql://postgres:postgres@localhost:5432/enterprise_platform_dev

# List all tables
\dt

# View table structure
\d "users"

# Exit
\q
```

---

## Backend Development

### Step 1: Install Backend Dependencies

```bash
cd apps/backend

# Install all dependencies
npm install

# Verify NestJS CLI is available
npx nest --version
```

### Step 2: Generate Prisma Client

```bash
# From apps/backend
npx prisma generate

# This creates the Prisma client for database operations
```

### Step 3: Start Backend Server

```bash
# Development mode with hot reload
npm run dev

# Expected output:
# [Nest] xx:xx:xx AM - 01/01/2024
# 🚀 Enterprise Platform Backend Server running at http://localhost:3000
# 📚 API Documentation: http://localhost:3000/api/docs
# 🔧 Environment: development
```

### Step 4: Verify Backend

```bash
# In another terminal, test health check
curl http://localhost:3000/api/v1/health

# Expected response:
# {
#   "status": "ok",
#   "timestamp": "2024-01-01T12:00:00.000Z",
#   "uptime": 123.456,
#   "environment": "development"
# }
```

### Step 5: Access API Documentation

```bash
# Open in browser
http://localhost:3000/api/docs

# Try out endpoints with Swagger UI
# Test /api/v1/health endpoint
```

### Step 6: Debugging

```bash
# View all logs in real-time
npm run dev

# Debug mode with inspector
node --inspect-brk dist/main.js

# Connect Chrome DevTools to chrome://inspect
```

---

## Frontend Development

### Step 1: Install Frontend Dependencies

```bash
cd apps/frontend

# Install dependencies
npm install

# Verify React and Vite
npm ls react vite
```

### Step 2: Start Frontend Server

```bash
# Development server with hot reload
npm run dev

# Expected output:
# VITE v5.0.8 ready in 123 ms
# ➜ Local: http://localhost:3001/
# ➜ press h to show help
```

### Step 3: Access Application

```bash
# Open in browser
http://localhost:3001

# You should see:
# - Header with navigation
# - Hero section
# - Features section
# - Business divisions grid
# - CTA section
# - Footer
```

### Step 4: Component Development

```bash
# Create a new component
# Location: src/components/YourComponent.tsx

import { useState } from 'react'

export default function YourComponent() {
  return (
    <div className="card p-6">
      <h1>Your Component</h1>
    </div>
  )
}

# Hot reload will automatically update the browser
```

### Step 5: TypeScript Checking

```bash
# Check for TypeScript errors
npm run type-check

# Should have zero errors
```

### Step 6: Build for Production

```bash
# Create optimized build
npm run build

# Output created in dist/ folder
# Verifies bundle size and optimization
```

---

## Testing

### Backend Testing

```bash
cd apps/backend

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov

# Coverage report: coverage/lcov-report/index.html
```

### Frontend Testing

```bash
cd apps/frontend

# Run Vitest
npm run test

# Run tests in UI mode
npm run test:ui

# View results at http://localhost:51204/__vitest__/
```

---

## Running Everything Together

### Option 1: Using Turbo (Recommended)

```bash
# From root directory
# Runs both backend and frontend in parallel

npm run dev

# You'll see output from both services:
# [api] [Nest] ...
# [web] VITE ...
```

### Option 2: Separate Terminals

```bash
# Terminal 1: Backend
cd apps/backend
npm run dev

# Terminal 2: Frontend (new terminal)
cd apps/frontend
npm run dev

# Terminal 3: (Optional) Database
npm run db:studio
```

### Verify Everything Works

```bash
# Health Check
curl http://localhost:3000/api/v1/health

# API Docs
http://localhost:3000/api/docs

# Frontend
http://localhost:3001

# Database UI
http://localhost:5555 (if running Prisma Studio)
```

---

## Development Workflow

### Making API Changes

```bash
# 1. Update Prisma schema
# File: apps/backend/prisma/schema.prisma

# 2. Create migration
cd apps/backend
npm run db:migrate

# 3. Update service/controller
# File: apps/backend/src/modules/*/

# 4. Add Swagger documentation
# Use @ApiOperation, @ApiResponse decorators

# 5. Restart backend (auto-reload)
# Frontend automatically reflects API changes
```

### Making UI Changes

```bash
# 1. Update component
# File: apps/frontend/src/components/*/

# 2. Hot reload automatically updates browser

# 3. Use Chrome DevTools for debugging
# Right-click → Inspect Element

# 4. Check TypeScript errors
npm run type-check
```

---

## Troubleshooting

### Docker Issues

```bash
# Containers not starting
docker-compose logs postgres
docker-compose logs redis

# Fix: Ensure ports are not in use
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis

# Restart services
docker-compose restart

# Complete reset (careful - loses data)
docker-compose down -v
docker-compose up -d
```

### Database Issues

```bash
# Migrations failing
# Solution: Check DATABASE_URL in .env.local

# Connection timeout
# Solution: Ensure PostgreSQL container is running
docker ps | grep postgres

# Reset database
cd apps/backend
npm run db:reset

# Check Prisma logs
PRISMA_DEBUG=* npm run db:migrate
```

### Backend Issues

```bash
# Module not found errors
# Solution: Rebuild TypeScript
npm run build

# Port already in use
# Solution: Kill process using port 3000
lsof -i :3000
kill -9 <PID>

# JWT errors
# Solution: Ensure JWT_SECRET is set in .env.local

# Clear node_modules cache
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

```bash
# Port already in use
# Solution: Kill process using port 3001
lsof -i :3001
kill -9 <PID>

# Hot reload not working
# Solution: Restart dev server
# Ctrl+C and npm run dev

# Tailwind styles not loading
# Solution: Clear cache
rm -rf .next node_modules/.cache
npm run dev
```

### Common Solutions

```bash
# Clean install
npm run clean        # If clean script exists
rm -rf node_modules package-lock.json
npm install

# Rebuild everything
npm run build

# Check versions
node --version
npm --version
npx -p @nestjs/cli nest --version

# View environment variables
echo $DATABASE_URL
echo $JWT_SECRET
```

---

## Performance Tips

### Optimize Backend
```bash
# Enable compression
# Already enabled in main.ts

# Use caching
# Redis is configured

# Monitor queries
# Enable prisma debug
PRISMA_DEBUG=* npm run dev
```

### Optimize Frontend
```bash
# Check bundle size
npm run build

# Analyze bundle
# Use Chrome DevTools Lighthouse

# Enable code splitting
# Already configured in vite.config.ts

# Lazy load routes
// Already implemented in App.tsx
```

---

## Next Steps

1. **Review Specification**: Read `ENTERPRISE_PLATFORM_SPEC.md`
2. **Explore Modules**: Check `apps/backend/src/modules/`
3. **Learn Architecture**: Study the 3-tier architecture in README
4. **Start Development**: Begin with Phase 2 requirements
5. **Run Tests**: Ensure all tests pass
6. **Deploy**: Follow deployment guide when ready

---

## Support & Resources

- **API Documentation**: http://localhost:3000/api/docs
- **Prisma Docs**: https://www.prisma.io/docs/
- **NestJS Docs**: https://docs.nestjs.com/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Setup Complete!** 🎉

You're ready to start developing the Enterprise Platform. Begin with Phase 2 implementation.
