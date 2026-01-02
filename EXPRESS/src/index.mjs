import express from "express";
import routes from "./routes/router.mjs";

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 3000;

app.get("/", (req, res) => {
  //request handler
  res.send({ msg: "Root" });
});

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
