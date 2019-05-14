function add(a, b) {
  let ten = 0;
  let str = '';
  for (let i = 1; a.length - i >= 0 || b.length - i >= 0 || ten; i += 1) {
    const sum = parseInt(a[a.length - i] || 0, 10) + parseInt(b[b.length - i] || 0, 10) + ten;
    if (sum >= 10) {
      ten = 1;
      str = (sum - 10) + str;
    } else {
      ten = 0;
      str = sum + str;
    }
  }
  return str;
}
