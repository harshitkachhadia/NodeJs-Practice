console.log("this is sum module");

a = "Hello";

function calculateSum(a,b){
    const sum = a+b;
    console.log(sum);   
}
// CommonJs way to exports the multiple things using the object
module.exports = {calculateSum};

// Another Way to export 
// module.exports.a = a;
// module.exports.calculateSum = calculateSum;


