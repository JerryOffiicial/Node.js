import {Router} from 'express'
import { orders } from '../utils/constants.mjs';
import { getParamsId, getOrderIndexById } from '../utils/middlewares.mjs';
import {createOrderValidationSchema} from "../utils/validationsSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";

const router = Router();

//Query params - //localhost:3000/api/users?filter=user_name&value=go
router.get("/api/orders", (req, res) => {
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    return res.send(
      orders.filter((order) => order[filter].toLowerCase().includes(value))
    );
  }
  res.send(orders);
});

//orders route param
router.get("/api/orders/:id", getParamsId, (req, res) => {
  const id = req.id;
  const order = orders.find((order) => order.id === id);

  if (order) {
    console.log(order);
    return res.send(order);
  }
  res.status(404).send({ msg: "order is not found" });
});

router.post(
  "/api/orders",
  checkSchema(createOrderValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    const body = matchedData(req);
    const newOrder = { id: orders[orders.length - 1].id + 1, ...body };
    orders.push(newOrder);
    return res.status(201).send(newOrder);
  }
);

router.put("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({ msg: "Bad request. Invalid Id" });
  }
  const { body } = req;
  const orderIndex = orders.findIndex((order) => order.id === id);
  orders[orderIndex] = { id: id, ...body };
  res.status(200).send({ msg: "order Updated" });
});

router.patch("/api/orders/:id", getOrderIndexById, (req, res) => {
  const orderIndex = req.orderIndex;
  const { body } = req;
  orders[orderIndex] = { ...orders[orderIndex], ...body };

  res.sendStatus(200);
});

router.delete("/api/orders/:id", getOrderIndexById, (req, res) => {
  const orderIndex = req.orderIndex;
  orders.splice(orderIndex, 1);
  res.sendStatus(200);
});

export default router;