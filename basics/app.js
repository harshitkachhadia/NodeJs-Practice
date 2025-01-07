// to import one module into another module
require("./xyz.js")
// to use members of another module by destructuring the object
// const {a, calculateSum}= require("./calculate/sum.js");
// const {calculateSubstraction} = require("./calculate/substract.js");

const { calculateSum, calculateSubstraction } = require("./calculate");

var str = "Harshit Kachhadiya"

var i = 10
var j = 20
calculateSum(i,j);
calculateSubstraction(i,j);
// console.log(a);


// console.log(globalThis); 
// standard global object
console.log(global === globalThis);


