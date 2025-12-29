const express = require("express"); //importing the express
const morgan = require("morgan"); // importing the morgan
const app = express();

app.listen(3000);

app.use(morgan('dev')); //GET /join 304 12.247 ms - - 

app.get("/", (request, response) => {
  //   response.status(200).send("<h1>Jerry</h1>");
  response.status(200).sendFile("./docs/index.html", { root: __dirname }); //sendFile needs to send a absolute path, for that root is necessary to make the relative path in to absolute
});

app.get("/join", (request, response) => {
  response.sendFile("./docs/join.html", { root: __dirname }); //sendFile needs to send a absolute path, for that root is necessary to make the relative path in to absolute
});

app.get("/about", (request, response) => {
  response.sendFile("./docs/about.html", { root: __dirname }); //sendFile needs to send a absolute path, for that root is necessary to make the relative path in to absolute
});

app.get("/joinus", (request, response) => {
  response.redirect("/join");
});

app.use((request, response) => {
  response.status(404).sendFile("./docs/notFound.html", { root: __dirname });
}); // must add this at last // it will run if there are not any matching path

//Browser -> Request -> Server (Middleware) -> Response -> Browser
//use logger using Middleware - authentication

//middleware
// app.use((request, response, next) => {
//   console.log("Middleware1");
//   console.log(request.host);
//   console.log(request.path);
//   console.log(request.method);
//   next(); // without this, it won't move to the next method. middleware needs to mention the next(). or the server wont reponse anything, it will stuck with this
// });

//middleware
// app.use((request, response, next) => {
//   console.log("Middleware 2");
//   next();
// });
