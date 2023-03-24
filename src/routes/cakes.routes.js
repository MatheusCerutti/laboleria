import { Router } from "express";
import { registerCake } from "../controllers/cake.controller.js";
import { validateSchema } from "../middlewares/validate.schemacake.js";
import { cakeSchema } from "../schemas/cake.schema.js";

const cakeRoutes = Router();

cakeRoutes.post ("/cakes",validateSchema(cakeSchema),registerCake)

export default cakeRoutes;