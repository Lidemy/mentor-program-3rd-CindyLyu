// 畫面隨機 1~3 秒後變色及開始計算點擊秒數
const element = document.querySelector('html');
const item = document.querySelector('button');

element.addEventListener('click',
  () => {
    if (!(element.classList.contains('bgGreen'))) {
      alert('還沒變色喔，失敗！');
      item.classList.remove('hidden');
    }
  });

let resultTime = 0;

function resultRealTime() {
  if (resultTime.toString().length <= 2) {
    return `0.${resultTime}`;
  }
  const arr = resultTime.toString().split('');
  arr.splice(arr.length - 2, 0, '.');
  return arr.join('');
}

let setInterval;

function calculationTime() {
  resultTime += 1;
}

function runTime() {
  setInterval = window.setInterval(calculationTime, 10);
}

function colorBg() {
  if (item.classList.contains('hidden')) {
    runTime();
    element.classList.add('bgGreen');
    element.addEventListener('click',
      () => {
        if (item.classList.contains('hidden')) {
          alert(`你的成績： ${resultRealTime()} 秒`);
          item.classList.toggle('hidden');
        }
      });
  }
}

function delayChangeBg() {
  window.setTimeout(colorBg, Math.random() * (3000 - 1000) + 1000);
}

delayChangeBg();

// 點擊「再玩一次」後秒數歸零
document.querySelector('.playAgain').addEventListener('click',
  (e) => {
    e.stopPropagation(); // 防止點擊後觸發點擊背景的事件
    element.classList.remove('bgGreen');
    item.classList.toggle('hidden');
    resultTime = 0;
    clearInterval(setInterval);
    delayChangeBg();
  });
