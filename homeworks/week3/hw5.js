function newarray(n) {
  const nArray = [];
  const odd = n.length % 15;
  let newstr = '';
  for (let i = 0; i < odd; i += 1) {
    newstr += n[i];
  }
  nArray.push(newstr);
  let c = odd;
  for (let j = 15 + odd; j <= n.length; j += 15) {
    let newstr2 = '';
    for (let i = c; i < j; i += 1) {
      newstr2 += n[i];
    }
    c += 15;
    nArray.push(newstr2);
  }
  return nArray;
}

function add(a, b) {
  const aArray = newarray(a); // 將 a 轉化成 Array
  const bArray = newarray(b); // 將 b 轉化成 Array
  let count = 0;
  // 判斷 a、b Array 長度差距
  if (aArray.length !== bArray.length) {
    count = Math.abs(aArray.length - bArray.length);
  }
  const resultArray = [];
  // 補足不足的長度好做後續相加
  for (let i = 0; i <= count; i += 1) {
    if (aArray.length > bArray.length) {
      bArray.push(i);
    } else if (bArray.length > aArray.length) {
      aArray.push(i);
    }
  }
  // a、b 相加
  for (let i = 0; i < aArray.length; i += 1) {
    const addArray = parseInt(aArray[i], 10) + parseInt(bArray[i], 10);
    resultArray.push(addArray);
  }
  let str1 = '';
  let str0 = '';
  // 判斷陣列的每個內容是否 16 位，是的話就需要進位來做相加
  for (let j = 1; j <= resultArray.length - 1; j += 1) {
    const str = resultArray[j].toString();
    if (str.length === 16) {
      for (let i = 1; i <= str.length - 1; i += 1) {
        str1 += str[i];
      }
      resultArray.splice(j, 1, str1);
      str0 += parseInt(resultArray[j - 1], 10) + parseInt(str[j - 1], 10);
      resultArray.splice(j - 1, 1, str0);
    }
  }
  let result = '';
  // 將相加後的 Array 轉化成字串組合起來
  for (let i = 0; i < resultArray.length; i += 1) {
    result += resultArray[i];
  }
  return result;
}
