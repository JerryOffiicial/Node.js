const hello = (hname) => {
  console.log(`Hello, ${hname}`);
};

hello("Jerry");

//Global Object  
//console.log(global); //we dont have the window, document in node js, but global is here

global.setTimeout(() => {
    console.log("This is a timeout function"); 
    clearInterval(intfunc);
}, 5000);

const intfunc = global.setInterval(() => {
    console.log("This is a interval function"); 
}, 1000);



//
console.log(__dirname);
console.log(__filename);

























//console.log("Hello world");
//node hello in terminal
