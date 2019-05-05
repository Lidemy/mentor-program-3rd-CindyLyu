function stars(n) {
  const result = [];
  let starRow = '';
  let i = 0;
  for (i; i < n; i += 1) {
    starRow += '*';
    result.push(starRow);
  }
  return result;
}
