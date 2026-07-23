# Enterprise Platform - Quick Start (5 Minutes)

## 🚀 Get Running in 5 Minutes

### Prerequisites
```bash
node --version   # v20+
npm --version    # v10+
docker --version # latest
```

### Step 1: Install (1 min)
```bash
git clone <repo>
cd enterprise-platform
npm install
```

### Step 2: Start Docker (1 min)
```bash
docker-compose up -d
docker ps  # Verify postgres and redis running
```

### Step 3: Database (1 min)
```bash
cd apps/backend
npm run db:migrate
```

### Step 4: Start Backend (1 min)
```bash
npm run dev
# Watch for: 🚀 Enterprise Platform Backend Server running at http://localhost:3000
```

### Step 5: Start Frontend (1 min)
```bash
# New terminal
cd apps/frontend
npm run dev
# Watch for: ➜ Local: http://localhost:3001/
```

## ✅ Verify Everything

```
Backend Health:     http://localhost:3000/api/v1/health
API Docs:           http://localhost:3000/api/docs
Frontend App:       http://localhost:3001
Database UI:        npm run db:studio (opens http://localhost:5555)
```

## 📝 Dev Commands

```bash
# From root
npm run dev                 # Start everything
npm run build               # Build all
npm run test                # Test all
npm run lint                # Lint all

# Backend specific
cd apps/backend
npm run dev                 # Dev server
npm run db:migrate          # Run migrations
npm run db:studio           # Database UI
npm run db:reset            # Reset DB (careful!)

# Frontend specific
cd apps/frontend
npm run dev                 # Dev server
npm run build               # Production build
npm run type-check          # Type checking
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `lsof -i :3000 \| kill -9 <PID>` |
| Port 3001 in use | `lsof -i :3001 \| kill -9 <PID>` |
| Database connection error | Check Docker: `docker ps` |
| Migrations fail | `cd apps/backend && npm run db:reset` |
| Dependencies issue | `npm ci` (clean install) |
| TypeScript errors | `npm run type-check` |

## 📚 Key Files

```
ENTERPRISE_PLATFORM_SPEC.md  - Full specification
SETUP_GUIDE.md               - Detailed setup
IMPLEMENTATION_ROADMAP.md    - Phase-by-phase plan
README.md                    - Project overview
```

## 🎯 Next Steps

1. ✅ **Setup complete!** Everything should be running
2. 📖 **Read IMPLEMENTATION_ROADMAP.md** - Understand Phase 2
3. 🔨 **Start Phase 2** - Build public website & auth
4. 📚 **API Reference** - http://localhost:3000/api/docs
5. 🗄️ **Database UI** - http://localhost:5555

## 🏗️ Project Structure

```
enterprise-platform/
├── apps/
│   ├── backend/      - NestJS API
│   └── frontend/     - React app
├── packages/         - Shared code
├── docker-compose.yml
├── package.json
└── turbo.json
```

## 💡 Quick Tips

- **Live reload**: Both backend and frontend auto-reload on file changes
- **Type safety**: Full TypeScript - no `any` types
- **Database**: Prisma Studio at http://localhost:5555
- **API Docs**: Swagger at http://localhost:3000/api/docs
- **Debug**: Chrome DevTools for frontend, VS Code debugger for backend

## 🆘 Need Help?

1. Check **SETUP_GUIDE.md** for detailed troubleshooting
2. Review **ENTERPRISE_PLATFORM_SPEC.md** for architecture
3. Check Docker logs: `docker-compose logs -f`
4. Check backend logs: Watch terminal output
5. Check frontend console: Browser DevTools

## 📊 Architecture Quick View

```
Frontend (React 19)    →    Backend (NestJS)    →    PostgreSQL
   :3001                      :3000                      :5432
                                ↓ (Cache)
                              Redis :6379
```

## 🔐 Default Credentials

**Development Only - Change in Production:**
- Super Admin: superadmin / Super@123
- Admin: admin / Admin@123
- Employee: employee / Employee@123
- See `ENTERPRISE_PLATFORM_SPEC.md` for all roles

## 📈 What's Built

✅ **Phase 1 - Complete**
- Project setup & structure
- Database schema (30+ tables)
- Authentication framework
- API gateway
- Frontend foundation
- Docker setup
- Comprehensive documentation

**Ready for Phase 2:**
- Public website
- Core authentication
- Admin portals
- Dashboard system

---

**You're all set! 🎉 Start developing!**
