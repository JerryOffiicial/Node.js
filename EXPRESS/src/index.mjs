import express from "express";
import routes from "./routes/router.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(cookieParser("Jerry"));
app.use(
  session({
    secret: "top secret",
    saveUninitialized: false, //for unwanted things
    resave: false, //not forcefully save again and again
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(routes);

const PORT = 3000;

app.get("/", (req, res) => {
  //request handler
  res.cookie("user", "Admin", { maxAge: 60000 * 60, signed: true });
  // console.log(req.session);
  console.log(req.session.id);
  req.sessionStore.get(req.session.id, (err, sessionData)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(sessionData);
    }
  })
  res.send({ msg: "Root" });
});

app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
