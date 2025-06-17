**Product API Backend**

This is a Node.js + TypeScript backend project for managing product-related APIs. It follows a modular structure with routes, controllers, middleware, and type-safe models.

✨ **Tech Stack**

Node.js

Express.js

TypeScript

📁 **Project Structure**

src/
├── constants/       # Reusable constants like status codes
├── controllers/     # Route handlers
├── data/            # Mock database
├── middleware/      # Express middleware functions
├── routes/          # API route definitions
├── types/           # TypeScript type definitions
└── index.ts         # Entry point

🚀 **Getting Started**

**Prerequisites**

Node.js (v16+ recommended)

npm or yarn

**Installation**

git clone https://github.com/Neel2651/Product-Management-App.git
cd Product-Management-App/backend
npm install

Setup for Local Development

Create a .env file in the root directory:

touch .env

Add environment variables to the .env file:

PORT=3000

**Start the development server:**

npm run dev

This uses ts-node-dev for automatic restarts on file changes.

If you encounter issues, ensure TypeScript and ts-node-dev are installed globally:

npm install -g typescript ts-node-dev

📢 **API Endpoints**

Use the provided Postman collection to test the APIs:

src/product-api.postman_collection.json

Example Endpoints

GET /products – List all products

POST /products – Create a new product

PUT /products/:id – Update a product

DELETE /products/:id – Delete a product

🔧 **Scripts**

npm run dev – Run in development mode using ts-node-dev

npm run build – Compile TypeScript to JavaScript

npm start – Run compiled JavaScript from dist
