function alphaSwap(n) {
  const upper = n.toUpperCase();
  const lower = n.toLowerCase();
  let result = '';
  let i = 0;
  for (i; i <= n.length - 1; i += 1) {
    if (upper[i] !== n[i]) result += upper[i];
    if (lower[i] !== n[i]) result += lower[i];
    if (upper[i] === n[i] && lower[i] === n[i]) result += n[i];
  }
  return result;
}
