import { Router } from "express";
import { getOrders, getOrdersId, registerOrders } from "../controllers/orders.controller.js";
import { validateSchema } from "../middlewares/validate.orderschema.js";
import { ordersSchema } from "../schemas/orders.schema.js";

const orderRoutes = Router();

orderRoutes.post ("/order",validateSchema(ordersSchema),registerOrders)
orderRoutes.get("/orders",getOrders)
orderRoutes.get("/orders/:id",getOrdersId)

export default orderRoutes;