function curry(...args) {
    let func = args.shift();
    return function (...subArgs) {
        let leftSubArgs = subArgs.slice(0);
        let newArgs = args.concat(leftSubArgs);
        if (newArgs.length >= func.length) {
            return func(...newArgs);
        } else {
            return curry(func, ...newArgs);
        }
    }   
}
// function curry(func) {
//     var args = Array.prototype.slice.call(arguments, 1);
//     return function () {
//         var subArgs = Array.prototype.slice.call(arguments);
//         var newArgs = args.concat(subArgs);
//         if (newArgs.length >= func.length) {
//             return func.apply(null, newArgs);
//         } else {
//             newArgs.unshift(func);
//             return curry.apply(null, newArgs);
//         }
//     }
// }
