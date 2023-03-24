import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cakeRoutes from "./routes/cakes.routes.js";
import clientRoutes from "./routes/clients.routes.js";
import orderRoutes from "./routes/orders.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cakeRoutes);
app.use(clientRoutes);
app.use(orderRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`O server está rodando na porta: ${port}`));