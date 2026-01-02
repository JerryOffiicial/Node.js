import express from "express";
import routes from "./routes/router.mjs";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser("Jerry"));
app.use(routes);

const PORT = 3000;

app.get("/", (req, res) => {//request handler
  res.cookie("user", "Admin", { maxAge: 60000 * 60, signed: true });
  res.send({ msg: "Root" });
});

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
