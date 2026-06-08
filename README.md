# Sentinel — Nuxt 3 JWT Auth Example

A complete, production-patterned authentication reference built with **Nuxt 3**, **JWT**, and **role-based access control**. This project is not a library or a starter template — it is an educational reference that shows you *exactly* how to wire up secure authentication in a real Nuxt 3 application.

> **In-memory storage by design.** Users reset on every server restart. This keeps the codebase focused on authentication patterns, not database setup.

![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens&logoColor=white)

---

## What you will learn

- How to issue and verify JWTs using **httpOnly cookies** (not localStorage)
- How to build Nuxt **route middleware** for guest-only, user-only, and admin-only guards
- How **server middleware** populates user context on every API request
- How to manage **global auth state** with `useState` composables
- How to implement **role-based access control** (RBAC) with two roles: `user` and `admin`
- How to hydrate the client session from a cookie on page load without exposing the token

---

## Quick start

```bash
# Clone
git clone https://github.com/PepeGonzale/nuxt3-auth-jwt-example.git
cd nuxt3-auth-jwt-example

# Install
npm install

# Create .env (optional — defaults work for development)
cp .env.example .env   # or create manually

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the demo credentials shown on the login page.

### Environment variables

```env
TOKEN_SECRET=your-super-secret-key-change-this-in-production
TOKEN_EXPIRES=7d
TOKEN_NAME=__session
```

> In production, always set `TOKEN_SECRET` to a cryptographically random string. Never use the default.

### Demo credentials

| Role  | Email             | Password   |
|-------|-------------------|------------|
| User  | user@gmail.com    | `password` |
| Admin | admin@gmail.com   | `password` |

---

## How the auth system works

### 1. Token storage — httpOnly cookie, not localStorage

When a user logs in or registers, the server signs a JWT and sets it as an **httpOnly cookie**:

```ts
// server/api/user/index.post.ts
setCookie(event, config.tokenName, token, {
  httpOnly: true,      // JavaScript cannot read this cookie
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 7  // 7 days
})
```

This means the token is **never accessible from JavaScript** — it cannot be stolen via XSS. The browser sends it automatically on every request.

---

### 2. Server middleware — user context on every request

`server/middleware/user.ts` runs before every API handler. It reads the cookie, verifies the JWT, and attaches the user to the request context:

```ts
// server/middleware/user.ts
export default defineEventHandler(async (event) => {
  const token = getCookie(event, config.tokenName)

  if (token) {
    const decoded = verifyToken(token)          // jwt.verify()
    const user    = getUserById(decoded.id)     // look up in store
    event.context.user = exclude(user, ['password'])
  }
})
```

Every API route can now access `event.context.user` without touching the cookie or the JWT again. This is the standard pattern for session context in Nuxt 3 server routes.

---

### 3. Client session hydration — plugin on startup

`plugins/auth.ts` runs once when the app boots. It calls `userLoggedIn()`, which fetches `/api/user/token`. That endpoint simply returns `event.context.user` (already populated by the server middleware):

```ts
// plugins/auth.ts
export default defineNuxtPlugin(async () => {
  await useAuth().userLoggedIn()
})
```

```ts
// composables/useAuth.ts — userLoggedIn()
const userLoggedIn = async () => {
  if (!authUser.value) {
    const data = await $fetch('/api/user/token', {
      headers: useRequestHeaders(['cookie'])   // forward cookie on SSR
    })
    setUser(data.user ?? null)
    userAdmin.value = data.user?.role?.includes('admin') ?? false
  }
}
```

After this runs, the reactive `authUser` and `userAdmin` state are populated for the entire app — no additional requests needed.

---

### 4. Route middleware — the three guard patterns

Nuxt route middleware runs before every navigation. This project implements the three patterns you will need in any real app:

#### `guest-only` — redirect authenticated users away from login/register

```ts
// middleware/guest-only.ts
export default defineNuxtRouteMiddleware(() => {
  const authUser = useAuthUser()

  if (authUser.value) {
    return navigateTo('/')
  }
})
```

Apply it to a page with:
```ts
definePageMeta({ middleware: 'guest-only' })
```

#### `user-only` — redirect unauthenticated users to login

```ts
// middleware/user-only.ts
export default defineNuxtRouteMiddleware(() => {
  const authUser = useAuthUser()

  if (!authUser.value) {
    return navigateTo('/login')
  }
})
```

#### `admin-only` — restrict a route to users with the admin role

```ts
// middleware/admin-only.ts
export default defineNuxtRouteMiddleware(() => {
  const { userAdmin } = useAuth()

  if (!userAdmin.value) {
    return navigateTo('/login')
  }
})
```

> **Important:** Route middleware is a client-side guard. It protects the UI, not the data. Always add a server-side check in the API handler for any sensitive endpoint:
>
> ```ts
> // server/api/user/users.get.ts
> if (!event.context.user?.role?.includes('admin')) {
>   throw createError({ statusCode: 403, message: 'Forbidden' })
> }
> ```

---

### 5. Global auth state — two composables

Auth state lives in two composables that wrap Nuxt's `useState`:

```ts
// composables/useAuthUser.ts
export const useAuthUser = () => useState<User | null>('user', () => null)
```

```ts
// composables/useAuth.ts
export const useAuth = () => {
  const authUser  = useAuthUser()
  const userAdmin = useState<boolean>('userAdmin', () => false)

  // login, logout, register, userLoggedIn...
  return { authUser, userAdmin, login, logout, register, userLoggedIn }
}
```

`useAuthUser()` is a lightweight composable for components that only need to read the user. `useAuth()` is for components that also need auth actions. Both share the same `useState` key so they always reference the same reactive state.

---

## Project structure

```
├── components/
│   ├── LoginForm.vue         # Email + password form, show/hide password
│   ├── LoginCredentials.vue  # Demo credentials card
│   └── RegisterForm.vue      # Registration form with confirm password
│
├── composables/
│   ├── useAuth.ts            # Auth actions + admin state
│   └── useAuthUser.ts        # Reactive user state (useState wrapper)
│
├── layouts/
│   └── default.vue           # Nav with mobile drawer, auth-aware links
│
├── middleware/               # Route-level guards (client + SSR)
│   ├── guest-only.ts
│   ├── user-only.ts
│   └── admin-only.ts
│
├── pages/
│   ├── index.vue             # Home — no middleware
│   ├── public.vue            # Public — no middleware
│   ├── login.vue             # guest-only middleware
│   ├── register.vue          # guest-only middleware
│   ├── private.vue           # user-only middleware
│   └── admin.vue             # admin-only middleware
│
├── plugins/
│   └── auth.ts               # Hydrates session on app boot
│
├── server/
│   ├── api/user/
│   │   ├── index.post.ts     # POST /api/user — login
│   │   ├── register.post.ts  # POST /api/user/register
│   │   ├── logout.get.ts     # GET  /api/user/logout
│   │   ├── token.get.ts      # GET  /api/user/token — session check
│   │   └── users.get.ts      # GET  /api/user/users — admin only
│   ├── middleware/
│   │   └── user.ts           # Runs on every request — populates context.user
│   ├── models/user.ts        # In-memory user store
│   ├── services/user.ts      # loginUser, registerUser
│   └── utils/
│       ├── password.ts       # bcrypt helpers
│       └── session.ts        # JWT sign/verify, cookie helpers
│
└── assets/css/
    └── design-tokens.css     # CSS custom properties — full design system
```

---

## Route protection summary

| Route      | Middleware    | Who can access              |
|------------|---------------|-----------------------------|
| `/`        | none          | Everyone                    |
| `/public`  | none          | Everyone                    |
| `/login`   | `guest-only`  | Unauthenticated users only  |
| `/register`| `guest-only`  | Unauthenticated users only  |
| `/private` | `user-only`   | Authenticated users         |
| `/admin`   | `admin-only`  | Users with `admin` role     |

---

## Tech stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Framework  | Nuxt 3 (Vue 3, SSR)               |
| Language   | TypeScript                         |
| Styling    | CSS custom properties + Tailwind   |
| Icons      | lucide-vue-next                    |
| Auth       | jsonwebtoken + bcryptjs            |
| Storage    | In-memory (by design)             |

---

## Contributing

Found a bug or want to improve the reference? Issues and PRs are welcome.

## License

MIT
