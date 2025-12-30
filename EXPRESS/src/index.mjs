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

const orders = [
  { id: 1, date: "24-03-2025", product: "laptop" },
  { id: 2, date: "22-04-2025", product: "mouse" },
  { id: 3, date: "18-05-2025", product: "keyboard" },
  { id: 4, date: "05-06-2025", product: "mouse" },
  { id: 5, date: "13-07-2025", product: "laptop" },
];

app.get("/", (req, res) => {
  //request handler
  res.send({ msg: "Root" });
});

//users
//Query params - //localhost:3000/api/users?filter=user_name&value=go
app.get("/api/users", (req, res) => {
  const {query: { filter, value },} = req; //we are using the object destructuring
  //console.log(filter, value);         //if it is req.query then no need to destructure the query, we can just destructure only the filter, value.

  if (filter && value) {
    return res.send(users.filter((user) => user[filter].toLowerCase().includes(value))
    //  Go through all users and return only the users whose filter field (like name or email) contains the search value
    );
  }
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
//Query params - //localhost:3000/api/users?filter=user_name&value=go
app.get("/api/products", (req, res) => {
  const {query:{filter, value}} = req;

  if(filter && value){
    return res.send(products.filter((product)=>product[filter].toLowerCase().includes(value)))
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
  const {query:{filter, value}} = req;
  if(filter && value){
    return res.send(orders.filter((order)=>order[filter].toLowerCase().includes(value)));
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



app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});

