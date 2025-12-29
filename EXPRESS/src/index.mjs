import express from "express";

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

app.get("/", (req, res) => {
  //request handler
  res.send({ msg: "Root" });
});

//users
app.get("/api/users", (req, res) => {
  res.send(users);
});

//Route Params for users
app.get("/api/users/:id", (req, res) => {
  // console.log(req.params);
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request, Invalid ID" }); // 400- invalid
  }
  const user = users.find((user) => user.id === id);
  if (user) {
    console.log(user);
    return res.send(user);
  }
  res.status(404).send({ msg: "User not found." }); //404- not found
});

//products
app.get("/api/products", (req, res) => {
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
  res.send({msg: "User not found"})
});

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
