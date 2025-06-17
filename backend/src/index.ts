import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/product.routes";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: "Origin, Content-Type",
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
