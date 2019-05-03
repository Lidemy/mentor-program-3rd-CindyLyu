function isPalindromes(str) {
  let upset = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    upset += str[i];
  }
  return upset === str;
}
