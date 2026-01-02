import { Router } from "express";
import { getParamsId } from "../utils/middlewares.mjs";
import { users } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationsSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { getUserIndexById } from "../utils/middlewares.mjs";

const router = Router();

//Query params - //localhost:3000/api/users?filter=user_name&value=go
router.get("/api/users", (req, res) => {
  console.log(req.signedCookies);

//   if (req.cookies.user && req.cookies.user === "Admin") {
  if (req.signedCookies.user && req.signedCookies.user === "Admin") {
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
    return res.send(users);
  }
  else{
     return res.send({msg: "You are not an Admin/ you don't have the right cookie"})
  }
});

//Route Params for users
router.get("/api/users/:id", getParamsId, (req, res) => {
  // console.log(req.params);
  const id = req.id;
  const user = users.find((user) => user.id === id);
  if (user) {
    console.log(user);
    return res.send(user);
  }
  res.status(404).send({ msg: "User not found." }); //404- not found
});

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (req, res) => {
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
  }
);

router.put("/api/users/:id", getParamsId, (req, res) => {
  const id = req.id;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).send({ msg: "User Not Found" });
  }
  const { body } = req;
  users[userIndex] = { id: id, ...body };
  return res.status(200).send({ msg: "User Updated" });
});

router.patch("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  const { body } = req;
  users[userIndex] = { ...users[userIndex], ...body };
  res.sendStatus(200);
});

router.delete("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  console.log(userIndex);

  users.splice(userIndex, 1);
  res.sendStatus(200);
});

export default router;
