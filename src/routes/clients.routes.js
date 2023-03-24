import { Router } from "express";
import { getClientOrders, registerClient } from "../controllers/clients.controller.js";
import { validateSchema } from "../middlewares/validate.clientschema.js";
import { clientsSchema } from "../schemas/clients.schema.js";

const clientRoutes = Router();

clientRoutes.post ("/clients",validateSchema(clientsSchema),registerClient)
clientRoutes.get("/clients/:id/orders",getClientOrders)

export default clientRoutes;