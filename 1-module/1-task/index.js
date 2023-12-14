function factorial(n) {
  if (n === 0 || n === 1) return 1;
  
  const number = n;
  for (let i = 1; i < number; i++) {
    n *= (number - i);
  }
  
  return n;
}