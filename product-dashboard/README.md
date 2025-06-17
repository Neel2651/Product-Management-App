🛒 Product Management Dashboard (Frontend)

A modern product management interface built using Next.js 14 (App Router), Material UI, TanStack Query, and TypeScript.

This dashboard enables you to view, create, update, and delete products with rich UI components and validation.

⚙️ Tech Stack

Next.js 14 with App Router

TypeScript

Material UI (MUI)

TanStack Query (React Query)

Axios with interceptors

Custom Hooks (e.g. debounced search)

📁 Folder Structure

.
├── app/
│   ├── components/             # UI components like ProductCard, Dialogs
│   ├── constants/              # Enums and constants (e.g. status)
│   ├── hooks/                  # Custom React hooks
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Product list UI
│   ├── theme.ts                # MUI custom theme
│   ├── providers.tsx           # QueryClient
│   └── page.module.css         # Page styling
├── public/                     # Static assets
├── .env.local                  # Local environment config
├── package.json
├── tsconfig.json
├── next.config.ts
├── README.md

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/your-username/product-dashboard.git
cd product-dashboard

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env.local file in the root and define:

NEXT_PUBLIC_API_URL=

Update the base URL of your backend.

4. Run the Development Server

npm run dev

Visit http://localhost:3000 to see it in action.

🧪 Available Scripts

Command

Description

npm run dev

Start the development server

npm run build

Build the app for production

npm run start

Start production server (after build)

npm run lint

Run ESLint for code quality

npm run typecheck

Run TypeScript static checks

✅ Features

CRUD operations for products

Client-side form validation

Status filters and debounced search

Paginated and scrollable product grid

Confirmation modal for deletes

Reusable, well-typed UI components

Axios abstraction layer

MUI theme support via app/theme.ts

🔧 Configuration

Axios Instance

Defined in lib/axios.ts, all API calls use a pre-configured base URL and interceptors.

📄 License

MIT License

👨‍💻 Author

Built with ❤️ by Neel Shah