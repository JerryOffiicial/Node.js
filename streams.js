const fs = require("fs");

//Read Stream
const readStream = fs.createReadStream("./docs/HugeFile.txt", {
  encoding: "utf8", //it will change to String
});

readStream.on("data", (buffer) => {
  console.log("\nNew Buffer\n");
  console.log(buffer);
  //console.log(buffer.toString());// no need convert with toString
});

//Write Stream
const writestream = fs.createWriteStream("./docs/copyHugeFile.txt");
readStream.on("data", (buffer) => {
  writestream.write("\nNew Buffer\n");
  writestream.write(buffer);
});

//instead of copying the data like this, we can use this easy method.
//const writestream = fs.createWriteStream("./docs/copyHugeFile.txt");
readStream.pipe(writestream);
