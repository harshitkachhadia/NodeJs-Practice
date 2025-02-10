const {calculateSubstraction} = require("./substract");
const {calculateSum} = require("./sum");

module.exports = {calculateSubstraction, calculateSum};

// require("./path");
// All the code of the module wrapped inside the function(IIFE)
// IIFE - Immediately invoked function expression 

// (function (module,require,....) {
// //     // All code of the module runs inside here
        // require("./path")
//     function calculateSubstraction(a,b){
//         const substraction = a - b;
//         console.log(substraction); 
//     }
//     module.exports = {calculateSubstraction}
    
// })(module.exports={});