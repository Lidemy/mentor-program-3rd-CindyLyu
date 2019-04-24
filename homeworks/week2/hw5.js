function join(str, concatStr) {
  let result = '';
  let i = 0;
  for (i; i <= str.length - 2; i += 1) {
    result = result + str[i] + concatStr;
  }
  return result + str[str.length - 1];
}

function repeat(str, times) {
  let result = '';
  let i = 1;
  for (i; i <= times; i += 1) {
    result += str;
  }
  return result;
}

console.log(join([1, 2, 3], ''));
console.log(repeat('a', 5));
