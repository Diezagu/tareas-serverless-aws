# Tareas Serverless AWS

App de tareas (CRUD) con frontend en React + TypeScript y backend serverless en AWS (Lambda + API Gateway + DynamoDB). Proyecto integrador de la Fase 1 de mi plan de aprendizaje Full-Stack Serverless.

## Demo

https://d2upl4421awthb.cloudfront.net

> El login es simulado (estado en memoria con Context API); todavía no hay autenticación real.

## Arquitectura

```
                 ┌──────────────┐      ┌──────────────────────┐
Navegador ──────▶│  CloudFront  │─────▶│ S3 (bucket privado,  │
   │             │  (CDN, HTTPS)│ OAC  │ build de Vite)       │
   │             └──────────────┘      └──────────────────────┘
   │
   │  fetch /tareas
   ▼
┌──────────────────┐      ┌──────────┐      ┌────────────────────┐
│ API Gateway      │─────▶│  Lambda  │─────▶│ DynamoDB (Tareas)  │
│ (HTTP API, CORS) │      │ (Node/TS)│      │                    │
└──────────────────┘      └──────────┘      └────────────────────┘
```

- **Frontend:** SPA estática servida por CloudFront desde un bucket S3 privado (solo CloudFront puede leerlo vía Origin Access Control).
- **Backend:** una sola Lambda (`TareasHandler`) atiende todas las rutas y decide por método HTTP.

### Endpoints

| Método | Ruta           | Descripción              |
|--------|----------------|--------------------------|
| GET    | `/tareas`      | Lista todas las tareas   |
| GET    | `/tareas/{id}` | Obtiene una tarea        |
| POST   | `/tareas`      | Crea una tarea (`texto`) |
| PUT    | `/tareas/{id}` | Actualiza `texto` y `completada` |
| DELETE | `/tareas/{id}` | Elimina una tarea        |

## Stack

| Capa        | Tecnología |
|-------------|------------|
| Frontend    | React 19, TypeScript, Vite, React Router, CSS Modules |
| Backend     | AWS Lambda (Node.js + TypeScript), AWS SDK v3 (`lib-dynamodb`) |
| API         | Amazon API Gateway (HTTP API) |
| Base de datos | Amazon DynamoDB |
| Hosting     | Amazon S3 + Amazon CloudFront |

El porqué de cada elección está en [`docs/decisions/`](docs/decisions/).

## Estructura

```
src/
  components/   # componentes de UI (ListaTareas, RouteGuard, ...)
  context/      # AuthContext (login simulado)
  hooks/        # useFetch, useForm
  pages/        # páginas por ruta
  services/     # tareas.ts: única capa que habla con la API
backend/
  src/tareas.ts # handler de la Lambda
docs/decisions/ # ADRs
```

## Correr en local

Requisitos: Node.js 24+.

```bash
npm install
cp .env.example .env   # y pon la URL de tu API en VITE_API_URL
npm run dev
```

| Variable       | Descripción |
|----------------|-------------|
| `VITE_API_URL` | URL base de la API Gateway (sin `/` final). Es pública: se incrusta en el bundle, así que nunca pongas secretos en variables `VITE_`. |

Otros scripts: `npm run build` (revisa tipos con `tsc` y genera `dist/`), `npm run lint`, `npm run preview`.

## Deploy (frontend)

```bash
npm run build

# Assets con hash en el nombre: caché de 1 año
aws s3 sync dist/ s3://<BUCKET> \
  --exclude "index.html" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# index.html: el navegador siempre revalida
aws s3 sync dist/ s3://<BUCKET> \
  --exclude "*" --include "index.html" \
  --cache-control "no-cache"

aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/index.html"
```

CloudFront tiene configuradas respuestas de error 403/404 → `/index.html` (200) para que las rutas de la SPA (ej. `/tareas`) funcionen al recargar.

## Decisiones de arquitectura

Registradas como ADRs en [`docs/decisions/`](docs/decisions/).
