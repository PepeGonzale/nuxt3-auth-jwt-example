# Nuxt 3 JWT Authentication Example

A complete and modern JWT authentication example in Nuxt 3. This project demonstrates how to implement a robust authentication system with user roles, route protection middleware, and a modern user interface.

## ✨ Features

- 🔐 **JWT Authentication** - Secure authentication system using JSON Web Tokens
- 👥 **Role Control** - Role system (admin/user) to control access
- 🛡️ **Protection Middleware** - Custom middleware to protect routes
- 📝 **User Registration** - Registration form with validation
- 🎨 **Modern UI** - Modern user interface with Tailwind CSS
- 🔒 **Protected Pages** - Examples of public, private, and administration pages
- 💾 **Session Management** - Session handling with HTTP-only cookies

## 🚀 Quick Start

### Installation

Install the dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# JWT Configuration
TOKEN_SECRET=your-super-secret-key-change-this-in-production
TOKEN_EXPIRES=7d
TOKEN_NAME=__session

# Environment
NODE_ENV=development
```

**⚠️ Important:** 
- Change `TOKEN_SECRET` to a secure secret key in production
- Use a random secret generator for production
- The `.env` file is in `.gitignore` and will not be committed to the repository

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## 📁 Project Structure

```
├── components/          # Reusable Vue components
│   ├── LoginForm.vue    # Login form
│   └── LoginCredentials.vue  # Test credentials
├── composables/         # Nuxt composables
│   ├── useAuth.ts       # Authentication logic
│   └── useAuthUser.ts   # User state
├── layouts/             # Application layouts
│   └── default.vue      # Main layout
├── middleware/          # Route protection middleware
│   ├── admin-only.ts    # Admin only
│   ├── guest-only.ts    # Guests only
│   └── user-only.ts     # Authenticated users only
├── pages/               # Application pages
│   ├── index.vue        # Home page
│   ├── login.vue        # Login page
│   ├── register.vue     # Registration page
│   ├── public.vue        # Public page
│   ├── private.vue       # Private page
│   └── admin.vue         # Administration page
├── server/              # Server code
│   ├── api/             # API endpoints
│   ├── middleware/      # Server middleware
│   ├── models/          # Data models
│   ├── services/        # Business services
│   └── utils/           # Server utilities
└── plugins/             # Nuxt plugins
    └── auth.ts          # Authentication plugin
```

## 🔑 Test Credentials

The project includes test users:

**Regular User:**
- Email: `user@gmail.com`
- Password: `password`

**Administrator:**
- Email: `admin@gmail.com`
- Password: `password`

## 🎯 Main Features

### Authentication

- **Login**: Sign in with email and password
- **Registration**: Create new user accounts
- **Logout**: Secure session termination
- **Persistence**: Session maintained through cookies

### Access Control

- **Public Pages**: Accessible to everyone
- **Private Pages**: Only authenticated users
- **Admin Pages**: Only users with administrator role

### Middleware

The project includes three types of middleware:

- `guest-only`: Only for unauthenticated users (e.g., login, registration)
- `user-only`: Only for authenticated users
- `admin-only`: Only for administrators

## 🛠️ Technologies Used

- **Nuxt 3** - Vue.js framework
- **TypeScript** - Static typing
- **Tailwind CSS** - CSS framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📝 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the MIT license.

## 🙏 Acknowledgments

This project is an educational example to demonstrate best practices for authentication in Nuxt 3.
