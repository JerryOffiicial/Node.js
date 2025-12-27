//pre defined module
const fs = require("fs");

//mkdir- make directory
if (!fs.existsSync("./docs")) {
  //check the file whether it is exist or not
  fs.mkdir("./docs", (err) => {
    // we need to mention the relative path, second we need to use call back function
    if (err) {
      console.log(err.message);
    } else console.log("Folder Created");
  });

  console.log("here here"); //it will execute first cus of the asynchronze function-mkdir()
}

//File write
fs.writeFile("./docs/file.txt", "My name is Jerry", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("File written");
  }
});

//File Read
if (fs.existsSync("./docs/file.txt")) {
  fs.readFile("./docs/file.txt", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(data.toString());
    }
  });
}

//Delete file
if (fs.existsSync("./docs/file.txt")) {
  fs.unlink("./docs/file.txt", (err) => {
    if (err) console.log(err.message);
    else console.log("file deleted");
  });
}

//Delete Folder
if (fs.existsSync("./docs")) {
  fs.rmdir("./docs", (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Folder deleted");
    }
  });
}
