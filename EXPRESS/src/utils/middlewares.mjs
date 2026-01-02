import { users } from "./constants.mjs";
// -------------Middle Ware ---------------

export const getUserIndexById = (req, res, next) => {
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

export const getProductIndexById = (req, res, next) => {
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

export const getOrderIndexById = (req, res, next) => {
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
export const getParamsId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad Request, Invalid ID" }); // 400- invalid
  }
  req.id = id;
  next();
};