import { Router } from "express";
import productsRouter from "../routes/products.mjs";
import usersRouter from "../routes/users.mjs";
import ordersRouter from "../routes/orders.mjs";

const router = Router();
router.use(productsRouter);
router.use(usersRouter);
router.use(ordersRouter);

export default router;
