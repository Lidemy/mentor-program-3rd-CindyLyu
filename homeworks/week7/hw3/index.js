const region = document.querySelector('.region');
const result = document.querySelector('.result');
let num = '';
let num2 = '';
let status = 0;// 0 為加法; 1 為減法; 2 為乘法; 3 為除法

function calculator() {
  region.addEventListener('click',
    (e) => {
      const targetId = e.target.id;
      if (parseInt(e.target.innerText, 10) >= 0) {
        num += e.target.innerText;
        result.innerText = num;
      }
      if (targetId === 'add') {
        num2 = num;
        num = '';
        status = 0;
      }
      if (targetId === 'minus') {
        num2 = num;
        num = '';
        status = 1;
      }
      if (targetId === 'mult') {
        num2 = num;
        num = '';
        status = 2;
      }
      if (targetId === 'division') {
        num2 = num;
        num = '';
        status = 3;
      }
      if (targetId === 'equal') {
        switch (status) {
          case 0:
            result.innerText = parseInt(num, 10) + parseInt(num2, 10);
            break;
          case 1:
            result.innerText = parseInt(num2, 10) - parseInt(num, 10);
            break;
          case 2:
            result.innerText = parseInt(num, 10) * parseInt(num2, 10);
            break;
          case 3:
            result.innerText = parseInt(num2, 10) / parseInt(num, 10);
            break;
          default:
            result.innerText = '出現未預期的錯誤';
        }
      }
      if (targetId === 'AC') {
        num = '';
        num2 = '';
        result.innerText = 0;
      }
    });
}

calculator();
