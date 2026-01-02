import {Router} from 'express'
import { products } from '../utils/constants.mjs';
import { getParamsId, getProductIndexById } from '../utils/middlewares.mjs';
import {createProductValidationSchema} from "../utils/validationsSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";


const router = Router();


//Query params - //localhost:3000/api/users?filter=user_name&value=go
router.get("/api/products", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    return res.send(
      products.filter((product) =>
        product[filter].toLowerCase().includes(value)
      )
    );
  }
  res.send(products);
});

//route params for products
router.get("/api/products/:id", getParamsId, (req, res) => {
  const id = req.id;
  const product = products.find((product) => product.id === id);
  if (product) {
    console.log(product);
    return res.send(product);
  }
  res.send({ msg: "User not found" });
});

router.post(
  "/api/products",
  checkSchema(createProductValidationSchema),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    const body = matchedData(req);
    const newProduct = { id: products[products.length - 1].id + 1, ...body };
    products.push(newProduct);
    return res.status(201).send(newProduct);
  }
);

router.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad request. invalid ID" });
  }
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    res.status(404).send({ msg: "User not found." });
  }
  const { body } = req;
  products[productIndex] = { id: id, ...body };
  res.status(200).send({ msg: "Product Updated" });
});

router.patch("/api/products/:id", getProductIndexById, (req, res) => {
  const productIndex = req.productIndex;
  const { body } = req;
  products[productIndex] = { ...products[productIndex], ...body };
  res.sendStatus(200);
});

router.delete("/api/products/:id", getProductIndexById, (req, res) => {
  const productIndex = req.productIndex;
  products.splice(productIndex, 1);
  res.sendStatus(200);
});

export default router;