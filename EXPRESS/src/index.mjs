import express from "express";
import {
  createOrderValidationSchema,
  createProductValidationSchema,
  createUserValidationSchema,
} from "./utils/validationsSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";

const app = express();

const PORT = 3000;

const users = [
  { id: 1, user_name: "Jerry" },
  { id: 2, user_name: "Zain" },
  { id: 3, user_name: "Suda" },
  { id: 4, user_name: "Anji" },
  { id: 5, user_name: "Kamal" },
];

const products = [
  { id: 1, product_name: "Laptop" },
  { id: 2, product_name: "Mouse" },
  { id: 3, product_name: "Keyboard" },
  { id: 4, product_name: "Speaker" },
  { id: 5, product_name: "webcam" },
];

const orders = [
  { id: 1, date: "24-03-2025", product: "laptop" },
  { id: 2, date: "22-04-2025", product: "mouse" },
  { id: 3, date: "18-05-2025", product: "keyboard" },
  { id: 4, date: "05-06-2025", product: "mouse" },
  { id: 5, date: "13-07-2025", product: "laptop" },
];

// -------------Middle Ware ---------------

const getUserIndexById = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request. Invalid ID" });
  }
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).send({ msg: "User Not Found" });
  }
  req.userIndex = userIndex; //adding a custom property called userIndex to the request object //store the found user’s index there so other middleware or route handlers can use it
  next();
};

const getProductIndexById = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request. Invalid ID" });
  }
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).send({ msg: "User Not Found" });
  }

  req.productIndex = productIndex;
};

const getOrderIndexById = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.send(400).send({ msg: "Bad Request. Invalid ID" });
  }
  const orderIndex = orders.findIndex((order) => order.id === id);

  if (orderIndex === -1) {
    res.status(404).send({ msg: "Orders not found" });
  }

  req.orderIndex = orderIndex;
  next();
};

// -------------Middle Ware ---------------
const getParamsId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request, Invalid ID" }); // 400- invalid
  }
  req.id = id;
  next();
};

app.get("/", (req, res) => {
  //request handler
  res.send({ msg: "Root" });
});

// --------------Get Request-----------------

//users
//Query params - //localhost:3000/api/users?filter=user_name&value=go
app.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req; //we are using the object destructuring
  //console.log(filter, value);         //if it is req.query then no need to destructure the query, we can just destructure only the filter, value.

  if (filter && value) {
    return res.send(
      users.filter((user) => user[filter].toLowerCase().includes(value))
      //  Go through all users and return only the users whose filter field (like name or email) contains the search value
    );
  }
  res.send(users);
});

//Route Params for users
app.get("/api/users/:id", getParamsId, (req, res) => {
  // console.log(req.params);
  const id = req.id;
  const user = users.find((user) => user.id === id);
  if (user) {
    console.log(user);
    return res.send(user);
  }
  res.status(404).send({ msg: "User not found." }); //404- not found
});

//products
//Query params - //localhost:3000/api/users?filter=user_name&value=go
app.get("/api/products", (req, res) => {
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
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id); //string into int
  console.log(id);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "Invalid Id" });
  }
  const product = products.find((product) => product.id === id);
  if (product) {
    console.log(product);
    return res.send(product);
  }
  res.send({ msg: "User not found" });
});

//orders
//Query params - //localhost:3000/api/users?filter=user_name&value=go
app.get("/api/orders", (req, res) => {
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
app.get("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "Invalid Id" });
  }
  const order = orders.find((order) => order.id === id);

  if (order) {
    console.log(order);
    return res.send(order);
  }
  res.status(404).send({ msg: "order is not found" });
});

// --------------Post Request-----------------
app.use(express.json()); //must -middleware

app.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array() });
  }

  // console.log(result);
  // console.log(req['express-validator#contexts']);
  const body = matchedData(req); //only validated data will enter to the body//only validated attributes are allowed
  const newUser = { id: users[users.length - 1].id + 1, ...body }; //auto mated id and adding the body data after the id
  users.push(newUser);
  return res.status(201).send(newUser); // 201- created
});

app.post( "/api/products", checkSchema(createProductValidationSchema), (req, res) => {
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

app.post("/api/orders", checkSchema(createOrderValidationSchema) ,(req, res) => {
  const result = validationResult(req);
   if(!result.isEmpty()){
    return res.status(400).send({error: result.array()});
   }

  const body = matchedData(req); 
  const newOrder = { id: orders[orders.length - 1].id + 1, ...body };
  orders.push(newOrder);
  return res.status(201).send(newOrder);
});

// ----------------Put Request(complete update) -----------------
// app.use(express.json()); //must

app.put("/api/users/:id", getParamsId, (req, res) => {
  const id = req.id;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).send({ msg: "User Not Found" });
  }
  const { body } = req;
  users[userIndex] = { id: id, ...body };
  return res.status(200).send({ msg: "User Updated" });
});

app.put("/api/products/:id", (req, res) => {
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

app.put("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({ msg: "Bad request. Invalid Id" });
  }
  const { body } = req;
  const orderIndex = orders.findIndex((order) => order.id === id);
  orders[orderIndex] = { id: id, ...body };
  res.status(200).send({ msg: "order Updated" });
});

// ----------------Patch Request -----------------
app.patch("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  const { body } = req;
  users[userIndex] = { ...users[userIndex], ...body };
  res.sendStatus(200);
});

app.patch("/api/products/:id", getProductIndexById, (req, res) => {
  const productIndex = req.productIndex;
  const { body } = req;
  products[productIndex] = { ...products[productIndex], ...body };
  res.sendStatus(200);
});

app.patch("/api/orders/:id", getOrderIndexById, (req, res) => {
  const orderIndex = req.orderIndex;
  const { body } = req;
  orders[orderIndex] = { ...orders[orderIndex], ...body };

  res.sendStatus(200);
});

// ----------------Delete Request -----------------

app.delete("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  console.log(userIndex);

  users.splice(userIndex, 1);
  res.sendStatus(200);
});

app.delete("/api/products/:id", getProductIndexById, (req, res) => {
  const productIndex = req.productIndex;
  products.splice(productIndex, 1);
  res.sendStatus(200);
});

app.delete("/api/orders/:id", getOrderIndexById, (req, res) => {
  const orderIndex = req.orderIndex;
  orders.splice(orderIndex, 1);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
