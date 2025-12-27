const imports = require('./data'); //it runs the data  file and behave  like a props
const {names,studentName} = require('./data'); //de-structured or spreading

console.log(imports.names);//can define with any name// we cant access it without export the variable from the parent page
console.log(names);//can define with any name// we cant access it without export the variable from the parent page
//has to mention the name that given in the export.
console.log(studentName);//like this 


const os =  require('os');
console.log(os);//os object
console.log(os.homedir());//os object

