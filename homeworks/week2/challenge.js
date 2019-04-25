function search(arr, n) {
  let i = arr.length;
  do {
    i = Math.floor(i / 2);
    if (arr[i] === n) {
      return i;
    }
  } while (i > 2);
  if (i <= 2 && arr[i] > n) {
    for (i; i <= arr.length && i >= 0; i -= 1) {
      if (arr[i] === n) {
        return i;
      }
    }
  }
  if (i <= 2 && arr[i] < n) {
    for (i; i <= arr.length; i += 1) {
      if (arr[i] === n) {
        return i;
      }
    }
  }
  return -1;
}
console.log(search([1, 2, 10, 14, 39], 1));
