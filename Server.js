// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((request, response) => {
//   console.log("Request Made");
//   console.log(request.url);
//   console.log(request.method);

//   response.setHeader("Content-Type", "text/html");
//   response.write('<head rel="script" href=""></head>');
//   response.write("<h1>Subscribe to Jerry</h1>");
//   response.write("<h4>Please do</h4>");
//   response.end();


const http = require("http");
const fs = require("fs");
const _ = require('lodash')
const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "text/html");

  console.log(request.url);
  let path = "./docs/";

  //   if (request.url == "/home" || request.url == "/") {
  if (request.url == "/") {
    path += "index.html";
    response.statusCode = 200; // not necessary but manual override also fine. 201 -created, register
  } else if (request.url == "/home") { //ridirect to another path/loacion
    response.statusCode = 301; // 301 - permanent ridirection , 302- tempo ridirection
    response.setHeader("Location", "/");
    response.end();
  } else if (request.url == "/join") {
    path += "join.html";
    response.statusCode = 200; // not necessary but manual override also fine.
  } else if (request.url == "/about") {
    path += "about.html";
    response.statusCode = 200; // not necessary but manual override also fine.
  } else {
    path += "notFound.html";
    response.statusCode = 404; // necessary
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err.message);
      response.end();
    } else {
      //response.write(data);
      response.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Server is Listening");
  console.log(_.random(15,30));
  
});

