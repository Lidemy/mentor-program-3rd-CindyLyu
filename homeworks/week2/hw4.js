function printFactor(n) {
  let i = 0;
  for (i; i <= n; i += 1) {
    if (n % i === 0) {
      console.log(i);
    }
  }
}

printFactor(5);
