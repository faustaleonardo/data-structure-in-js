// can try this next time
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// function gcd(a, g) {
//   while (a > 0) {
//     const temp = g % a;
//     g = a;
//     a = temp;
//   }
//   return g;
// }
