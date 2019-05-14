function search(arr, n) {
  let L = 0;
  let R = arr.length - 1;
  while (L <= R) {
    const i = Math.floor((L + R) / 2);
    if (arr[i] === n) {
      return i;
    }
    if (arr[i] > n) {
      R -= 1;
    }
    if (arr[i] < n) {
      L += 1;
    }
  }
  return -1;
}
