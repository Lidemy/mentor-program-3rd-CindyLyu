function reverse(str) {
  let c = '';
  let i = str.length - 1;
  for (i; i >= 0; i -= 1) {
    c += str[i];
  }
  console.log(c);
}
reverse('1,2,3,4,2,1');
