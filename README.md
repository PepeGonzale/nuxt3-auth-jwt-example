# Nuxt 3 JWT Authentication Example

Un ejemplo completo y moderno de autenticación con JWT en Nuxt 3. Este proyecto demuestra cómo implementar un sistema de autenticación robusto con roles de usuario, middleware de protección de rutas, y una interfaz de usuario moderna.

## ✨ Características

- 🔐 **Autenticación JWT** - Sistema de autenticación seguro usando JSON Web Tokens
- 👥 **Control de Roles** - Sistema de roles (admin/user) para controlar el acceso
- 🛡️ **Middleware de Protección** - Middleware personalizado para proteger rutas
- 📝 **Registro de Usuarios** - Formulario de registro con validación
- 🎨 **UI Moderna** - Interfaz de usuario moderna con Tailwind CSS
- 🔒 **Páginas Protegidas** - Ejemplos de páginas públicas, privadas y de administración
- 💾 **Gestión de Sesiones** - Manejo de sesiones con cookies HTTP-only

## 🚀 Inicio Rápido

### Instalación

Instala las dependencias:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# JWT Configuration
TOKEN_SECRET=tu-secret-key-super-segura-aqui
TOKEN_EXPIRES=7d
TOKEN_NAME=__session

# Environment
NODE_ENV=development
```

**⚠️ Importante:** 
- Cambia `TOKEN_SECRET` por una clave secreta segura en producción
- Usa un generador de secretos aleatorios para producción
- El archivo `.env` está en `.gitignore` y no se subirá al repositorio

### Servidor de Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
├── components/          # Componentes Vue reutilizables
│   ├── LoginForm.vue    # Formulario de login
│   └── LoginCredentials.vue  # Credenciales de prueba
├── composables/         # Composables de Nuxt
│   ├── useAuth.ts       # Lógica de autenticación
│   └── useAuthUser.ts   # Estado del usuario
├── layouts/             # Layouts de la aplicación
│   └── default.vue      # Layout principal
├── middleware/          # Middleware de protección de rutas
│   ├── admin-only.ts    # Solo administradores
│   ├── guest-only.ts    # Solo invitados
│   └── user-only.ts     # Solo usuarios autenticados
├── pages/               # Páginas de la aplicación
│   ├── index.vue        # Página de inicio
│   ├── login.vue        # Página de login
│   ├── register.vue     # Página de registro
│   ├── public.vue       # Página pública
│   ├── private.vue      # Página privada
│   └── admin.vue        # Página de administración
├── server/              # Código del servidor
│   ├── api/             # Endpoints de la API
│   ├── middleware/      # Middleware del servidor
│   ├── models/          # Modelos de datos
│   ├── services/        # Servicios de negocio
│   └── utils/           # Utilidades del servidor
└── plugins/             # Plugins de Nuxt
    └── auth.ts          # Plugin de autenticación
```

## 🔑 Credenciales de Prueba

El proyecto incluye usuarios de prueba:

**Usuario Regular:**
- Email: `user@gmail.com`
- Password: `password`

**Administrador:**
- Email: `admin@gmail.com`
- Password: `password`

## 🎯 Funcionalidades Principales

### Autenticación

- **Login**: Inicio de sesión con email y contraseña
- **Registro**: Creación de nuevas cuentas de usuario
- **Logout**: Cierre de sesión seguro
- **Persistencia**: La sesión se mantiene mediante cookies

### Control de Acceso

- **Páginas Públicas**: Accesibles para todos
- **Páginas Privadas**: Solo usuarios autenticados
- **Páginas de Admin**: Solo usuarios con rol de administrador

### Middleware

El proyecto incluye tres tipos de middleware:

- `guest-only`: Solo para usuarios no autenticados (ej: login, registro)
- `user-only`: Solo para usuarios autenticados
- `admin-only`: Solo para administradores

## 🛠️ Tecnologías Utilizadas

- **Nuxt 3** - Framework Vue.js
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **JWT** - JSON Web Tokens para autenticación
- **bcryptjs** - Hashing de contraseñas

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de producción
npm run preview

# Generar sitio estático
npm run generate
```

## 🤝 Contribuir

Las contribuciones son bienvenidas! Siéntete libre de abrir un issue o enviar un pull request.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

Este proyecto es un ejemplo educativo para demostrar las mejores prácticas de autenticación en Nuxt 3.
