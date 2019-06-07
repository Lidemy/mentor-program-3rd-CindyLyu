const request = new XMLHttpRequest();
const html = document.querySelector('html');
const body = document.querySelector('body');
const prizeElement = document.createElement('div');
prizeElement.classList.add('prize__content');
const prize = document.querySelector('.prize');
const pickout = document.querySelector('.pickout');
const start = document.querySelector('.start');
let bgColor;

function playAgain() {
  start.classList.add('pickout');
  start.innerText = '抽獎 GO!';
  body.classList.remove(bgColor);
  prize.innerHTML = ' ';
  startPlay();
}

function content(url, title, info, credit) {
  prizeElement.innerHTML = `<img class='prize__image' src='${url}'>
            <div class='prize__info title'>${title}</div>
            <div class='prize__info'>${info}</div>
            <div class='prize__point'>點擊任一處返回</div>
            <div class='prize__credit'>${credit}</div>`;
}

function startPlay() {
  pickout.addEventListener('click',
    () => {
      request.onload = () => {
        if (request.status >= 200 && request.status <= 400) {
          const data = JSON.parse(request.responseText);
          let url;
          let title;
          let info;
          let credit;
          start.innerText = '';
          start.classList.remove('pickout');
          switch (data.prize) {
            case 'FIRST':
              bgColor = 'color__skyblue';
              body.classList.add(bgColor);
              url = 'ttps://image.flaticon.com/icons/svg/201/201623.svg';
              title = '頭獎';
              info = '恭喜你中頭獎了！日本東京來回雙人遊！';
              credit = 'Icon made by Icon Pond from www.flaticon.com';
              content(url, title, info, credit);
              prize.appendChild(prizeElement);
              html.addEventListener('click', playAgain);
              break;
            case 'SECOND':
              bgColor = 'color__grey';
              body.classList.add(bgColor);
              url = 'https://image.flaticon.com/icons/svg/326/326023.svg';
              title = '二獎';
              info = '二獎！90 吋電視一台！';
              credit = 'Icon made by Icon Pond from www.flaticon.com';
              content(url, title, info, credit);
              prize.appendChild(prizeElement);
              html.addEventListener('click', playAgain);
              break;
            case 'THIRD':
              bgColor = 'color__orange';
              body.classList.add(bgColor);
              url = 'https://image.flaticon.com/icons/svg/946/946748.svg';
              title = '三獎';
              info = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
              credit = 'Icon made by Icon Pond from www.flaticon.com';
              content(url, title, info, credit);
              prize.appendChild(prizeElement);
              html.addEventListener('click', playAgain);
              break;
            default: // 當'NONE'時
              bgColor = 'color__black';
              body.classList.add(bgColor);
              url = 'https://image.flaticon.com/icons/svg/1201/1201958.svg';
              title = '銘謝惠顧';
              info = '';
              credit = 'Icon made by Freepik from www.flaticon.com';
              content(url, title, info, credit);
              prize.appendChild(prizeElement);
              html.addEventListener('click', playAgain);
              break;
          }
        } else {
          alert('系統不穩定請再試一次');
        }
      };
      request.onerror = () => {
        alert('系統不穩定請再試一次', request.status);
      };
      request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
      request.send();
    });
}

startPlay();
