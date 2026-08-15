# DevOps Project — Healthcare Management System

A full-stack DevOps showcase project built with the **MERN stack**, containerized with **Docker**, and automated via a **Jenkins CI/CD pipeline**.

---

## 🏗️ Architecture

```
GitHub Push
    │
    ▼
Jenkins Pipeline (CI/CD)
    │
    ├── Clone Repository
    ├── Install Dependencies
    ├── Lint
    ├── Build Frontend Docker Image  ──► Docker Hub (ahish2006/devops-frontend)
    ├── Build Backend Docker Image   ──► Docker Hub (ahish2006/devops-backend)
    └── Deploy via Docker Compose
            │
            ├── frontend  (NGINX:alpine  — port 80)
            ├── backend   (Node:22-alpine — port 5000)
            └── mongo     (MongoDB 7      — port 27017)
```

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19, Vite, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Web Server | NGINX (Alpine) |
| Containerization | Docker (multi-stage builds) |
| Orchestration | Docker Compose |
| CI/CD | Jenkins (7-stage pipeline) |
| Registry | Docker Hub |
| Version Control | Git, GitHub |

---

## 🚀 Quick Start

### Run locally with Docker Compose

```bash
# Clone the repo
git clone https://github.com/AHISH2006/Devops_Project.git
cd Devops_Project

# Start all services (frontend + backend + MongoDB)
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

### Access the app
| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/api/health |

### Demo Credentials
| Username | Password | Role |
|---|---|---|
| `admin` | `admin123` | Admin Dashboard |
| `devops` | `devops123` | Admin Dashboard |
| `user` | `user123` | User Dashboard |

---

## 🔁 CI/CD Pipeline (Jenkins)

### Pipeline Stages

```
1. Clone Repository      → git pull from GitHub (main branch)
2. Install Dependencies  → npm install
3. Lint                  → npm run lint
4. Build Frontend Image  → Docker multi-stage build (Node → NGINX)
5. Build Backend Image   → Docker Node.js Alpine image
6. Push to Docker Hub    → Tagged with :latest AND :BUILD_NUMBER
7. Deploy                → docker-compose up -d
```

### Jenkins Setup
1. Add credentials in Jenkins:
   - `github-credentials` — GitHub username/token
   - `dockerhub-credentials` — Docker Hub username/password
2. Create a **Pipeline** job pointing to this repo
3. Set branch to `main`
4. Add a **GitHub Webhook** to auto-trigger on push

---

## 📦 Docker Images

```bash
# Pull images manually
docker pull ahish2006/devops-frontend:latest
docker pull ahish2006/devops-backend:latest
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login + get JWT |

### Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Service health + DB status |

### Reports
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/reports/create` | Doctor | Create report |
| GET | `/api/reports/:patientId` | Patient | View own reports |
| GET | `/api/reports/doctor/reports` | Doctor | View all reports |

---

## 📁 Project Structure

```
Devops_Project/
├── src/                    ← React frontend
│   ├── pages/              ← 11 pages
│   ├── components/         ← Reusable components
│   └── styles/             ← CSS stylesheets
├── backend/                ← Node.js API
│   ├── routes/             ← Auth + Reports routes
│   ├── controllers/        ← Business logic
│   ├── models/             ← MongoDB schemas
│   ├── middleware/         ← JWT auth middleware
│   ├── config/             ← DB connection
│   ├── server.js           ← Express entry point
│   └── Dockerfile          ← Backend container
├── Dockerfile              ← Frontend multi-stage build
├── docker-compose.yml      ← Orchestrates all 3 services
├── Jenkinsfile             ← 7-stage CI/CD pipeline
└── nginx.conf              ← NGINX SPA + API proxy config
```

---

## 👨‍💻 Author

**AHISH S M** — [GitHub](https://github.com/AHISH2006)
