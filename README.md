#  Sistema de Gestión de Proveedores, Servicios y Tarifarios

Sistema Full-Stack para la gestión de proveedores, sus servicios y tarifarios. Desarrollado con **NestJS** (Backend) y **Angular** (Frontend).

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Tabla de Contenidos

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Scripts Disponibles](#-scripts-disponibles)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Reglas de Negocio](#-reglas-de-negocio)

---

## Descripción

Este proyecto implementa un sistema CRUD completo para gestionar:

- **Proveedores**: Empresas que ofrecen servicios
- **Servicios**: Offerings de cada proveedor
- **Tarifarios**: Precios y vigencias de cada servicio

### Características principales:

API RESTful con NestJS y TypeORM  
Base de datos PostgreSQL con relaciones  
Validación de datos con class-validator  
Frontend responsive con Angular y Tailwind CSS  
Formularios reactivos con validaciones  
Reglas de negocio implementadas  

---

##  Tecnologías

### Backend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| NestJS | 11.x | Framework de Node.js |
| TypeORM | 0.3.x | ORM para TypeScript |
| PostgreSQL | 15+ | Base de datos relacional |
| class-validator | 0.14.x | Validación de DTOs |

### Frontend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Angular | 21.x | Framework frontend |
| Tailwind CSS | 4.x | Framework de estilos |
| RxJS | 7.x | Programación reactiva |

---

##  Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (v9 o superior) - Incluido con Node.js
- **PostgreSQL** (v15 o superior) - [Descargar](https://www.postgresql.org/download/)
- **Git** - [Descargar](https://git-scm.com/)

### Verificar instalación:

```bash
node --version    # v18.x.x o superior
npm --version     # 9.x.x o superior
psql --version    # 15.x o superior
```

---

##  Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/KIMIS7/Sistema-De-Proveedores
cd Sistema-De-Proveedores
```

### 2. Configurar la base de datos

```bash
# Acceder a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE horizon_db;

# Salir
\q
```

### 3. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 4. Configurar variables de entorno del Backend

Edita el archivo `src/app.module.ts` con tus credenciales de PostgreSQL:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'tu_usuario',    // ← Cambiar
  password: 'tu_password',   // ← Cambiar
  database: 'horizon_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
})
```

### 5. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

---

## ▶Ejecución

### Opción 1: Ejecutar por separado

#### Terminal 1 - Backend:
```bash
cd backend
npm run start:dev
```
El servidor estará disponible en: `http://localhost:3000`

#### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```
La aplicación estará disponible en: `http://localhost:4200`


---

##  Scripts Disponibles

### Backend (`/backend`)

| Script | Comando | Descripción |
|--------|---------|-------------|
| `npm run start` | `nest start` | Inicia la aplicación una vez |
| `npm run start:dev` | `nest start --watch` | **Desarrollo** - Hot reload activado |
| `npm run start:debug` | `nest start --debug --watch` | Desarrollo con debugger |
| `npm run start:prod` | `node dist/main` | Producción (requiere build) |
| `npm run build` | `nest build` | Compila a JavaScript en `/dist` |
| `npm run lint` | `eslint --fix` | Analiza y corrige código |
| `npm run format` | `prettier --write` | Formatea el código |
| `npm test` | `jest` | Ejecuta pruebas unitarias |
| `npm run test:watch` | `jest --watch` | Pruebas en modo watch |
| `npm run test:cov` | `jest --coverage` | Pruebas con cobertura |
| `npm run test:e2e` | `jest --config ./test/jest-e2e.json` | Pruebas end-to-end |

### Frontend (`/frontend`)

| Script | Comando | Descripción |
|--------|---------|-------------|
| `npm start` | `ng serve` | **Desarrollo** - Servidor en localhost:4200 |
| `npm run build` | `ng build` | Compila para producción en `/dist` |
| `npm run watch` | `ng build --watch` | Compilación continua |
| `npm test` | `ng test` | Ejecuta pruebas unitarias |
| `npm run ng` | `ng` | Acceso al CLI de Angular |

---

##  Endpoints de la API

Base URL: `http://localhost:3000/api`

### Providers (Proveedores)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/providers` | Listar todos | - |
| `GET` | `/providers/:id` | Obtener uno | - |
| `POST` | `/providers` | Crear | `{ name, contactEmail, phone, isActive? }` |
| `PATCH` | `/providers/:id` | Actualizar | `{ name?, contactEmail?, phone?, isActive? }` |
| `DELETE` | `/providers/:id` | Eliminar | - |

#### Ejemplo de creación:
```bash
curl -X POST http://localhost:3000/api/providers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Empresa ABC",
    "contactEmail": "contacto@empresa.com",
    "phone": "5551234567"
  }'
```

### Services (Servicios)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/services` | Listar todos | - |
| `GET` | `/services/:id` | Obtener uno | - |
| `POST` | `/services` | Crear | `{ name, description, providerId, isActive? }` |
| `PATCH` | `/services/:id` | Actualizar | `{ name?, description?, isActive? }` |
| `DELETE` | `/services/:id` | Eliminar | - |

#### Ejemplo de creación:
```bash
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Servicio de Limpieza",
    "description": "Limpieza general de oficinas",
    "providerId": 1
  }'
```

### Rates (Tarifarios)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/rates` | Listar todos | - |
| `GET` | `/rates/:id` | Obtener uno | - |
| `POST` | `/rates` | Crear | `{ price, startDate, endDate, currency, serviceId }` |
| `PATCH` | `/rates/:id` | Actualizar | `{ price?, startDate?, endDate?, currency? }` |
| `DELETE` | `/rates/:id` | Eliminar | - |

#### Ejemplo de creación:
```bash
curl -X POST http://localhost:3000/api/rates \
  -H "Content-Type: application/json" \
  -d '{
    "price": 150.50,
    "startDate": "2025-01-01",
    "endDate": "2025-06-30",
    "currency": "USD",
    "serviceId": 1
  }'
```

### Códigos de Respuesta

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Recurso creado |
| `400` | Bad Request - Datos inválidos o regla de negocio violada |
| `404` | Not Found - Recurso no encontrado |
| `500` | Internal Server Error - Error del servidor |

---

## 📁 Estructura del Proyecto

```
proyecto/
├── backend/                          # API NestJS
│   ├── src/
│   │   ├── providers/                # Módulo Proveedores
│   │   │   ├── dto/
│   │   │   │   ├── create-provider.dto.ts
│   │   │   │   └── update-provider.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── provider.entity.ts
│   │   │   ├── providers.controller.ts
│   │   │   ├── providers.service.ts
│   │   │   └── providers.module.ts
│   │   ├── services/                 # Módulo Servicios
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── services.controller.ts
│   │   │   ├── services.service.ts
│   │   │   └── services.module.ts
│   │   ├── rates/                    # Módulo Tarifarios
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── rates.controller.ts
│   │   │   ├── rates.service.ts
│   │   │   └── rates.module.ts
│   │   ├── app.module.ts             # Módulo raíz
│   │   └── main.ts                   # Punto de entrada
│   ├── test/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # App Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── models/           # Interfaces
│   │   │   │   │   ├── provider.ts
│   │   │   │   │   ├── service.ts
│   │   │   │   │   └── rate.ts
│   │   │   │   └── services/         # Servicios HTTP
│   │   │   │       ├── provider.service.ts
│   │   │   │       ├── service.service.ts
│   │   │   │       └── rate.service.ts
│   │   │   ├── features/
│   │   │   │   ├── providers/        # Componentes de Proveedores
│   │   │   │   │   ├── provider-list/
│   │   │   │   │   ├── provider-form/
│   │   │   │   │   └── provider-detail/
│   │   │   │   ├── services/         # Componentes de Servicios
│   │   │   │   └── rates/            # Componentes de Tarifarios
│   │   │   ├── shared/
│   │   │   │   └── components/
│   │   │   │       └── navbar/
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

##  Reglas de Negocio

El sistema implementa las siguientes validaciones:

### Proveedores
| Regla | Descripción |
|-------|-------------|
| ❌ No eliminar con servicios | Un proveedor con servicios asociados no puede ser eliminado |

### Servicios
| Regla | Descripción |
|-------|-------------|
| ❌ No eliminar con tarifarios | Un servicio con tarifarios asociados no puede ser eliminado |

### Tarifarios
| Regla | Descripción |
|-------|-------------|
| ❌ No solapar fechas | No se pueden crear tarifarios con rangos de fechas que se solapen para el mismo servicio |

### Ejemplo de validación de overlap:

```
Tarifario existente:  |-------- 01/01 - 30/06 --------|
Nuevo tarifario:                    |---- 01/05 - 31/12 ----| ❌ RECHAZADO

Tarifario existente:  |-------- 01/01 - 30/06 --------|
Nuevo tarifario:                                        |---- 01/07 - 31/12 ----| ✅ PERMITIDO
```


##  Modelo de Datos

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│    Provider     │         │     Service     │         │      Rate       │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)         │         │ id (PK)         │
│ name            │         │ name            │         │ price           │
│ contactEmail    │──1:N───▶│ description     │──1:N───▶│ startDate       │
│ phone           │         │ isActive        │         │ endDate         │
│ isActive        │         │ providerId (FK) │         │ currency        │
│ createdAt       │         │                 │         │ serviceId (FK)  │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

---

##  Pruebas con cURL

### Flujo completo de pruebas:

```bash
# 1. Crear un proveedor
curl -X POST http://localhost:3000/api/providers \
  -H "Content-Type: application/json" \
  -d '{"name": "Tech Solutions", "contactEmail": "info@tech.com", "phone": "5559876543"}'

# 2. Crear un servicio para el proveedor
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{"name": "Soporte IT", "description": "Soporte técnico 24/7", "providerId": 1}'

# 3. Crear un tarifario para el servicio
curl -X POST http://localhost:3000/api/rates \
  -H "Content-Type: application/json" \
  -d '{"price": 500, "startDate": "2025-01-01", "endDate": "2025-06-30", "currency": "USD", "serviceId": 1}'

# 4. Intentar eliminar el proveedor (debería fallar)
curl -X DELETE http://localhost:3000/api/providers/1
# Respuesta: {"statusCode":400,"message":"No se puede eliminar un proveedor con servicios asociados"}

# 5. Intentar crear tarifario con fechas solapadas (debería fallar)
curl -X POST http://localhost:3000/api/rates \
  -H "Content-Type: application/json" \
  -d '{"price": 600, "startDate": "2025-03-01", "endDate": "2025-09-30", "currency": "USD", "serviceId": 1}'
# Respuesta: {"statusCode":400,"message":"Ya existe un tarifario con fechas que se solapan"}
```

