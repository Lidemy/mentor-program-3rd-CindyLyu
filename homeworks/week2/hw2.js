function Capitalize(str) {
  const charcode = str.charCodeAt(0);
  if (charcode > 0) {
    const isUpperCase = str.toUpperCase();
    const result = str.replace(str[0], isUpperCase[0]);
    return result;
  }
}

console.log(Capitalize('nick'));
