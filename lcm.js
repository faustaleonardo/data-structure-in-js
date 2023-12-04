const lcm = (a, b) => (a * b) / gcd(a, b);
const gcd = (a, b) => (a === 0 ? b : gcd(b % a, a));
