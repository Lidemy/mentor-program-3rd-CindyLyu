const request = new XMLHttpRequest();
const newpostSubmit = document.querySelector('.messageboard__newpost-submit');
const newpostInput = document.querySelector('.messageboard__newpost-input');
const changePage = document.querySelector('.messageboard__changepage');
const latestPostRegion = document.querySelector('.messageboard__latestpost-region');
let page;
let data;

function countEnd(dataLength, clickPage) {
  if ((dataLength - clickPage * 20) > 0) {
    return dataLength - clickPage * 20;
  }
  return 0;
}

// 點擊換頁
changePage.onclick = (e) => {
  const dataLength = data.length;
  const clickPage = parseInt(e.target.innerText, 10); // 點擊到第幾頁
  if (clickPage <= page) { // 防止手滑點到非頁數的地方
    const changePageChildTarget = document.querySelector(`#page-button${clickPage}`);
    const activePageNum = document.querySelector('.active').innerText;
    const activePage = document.querySelector(`#page-button${activePageNum}`);
    activePage.classList.remove('active');
    changePageChildTarget.classList.add('active');
    let startID = dataLength - 1; // 當頁數為 1 時取的第一個 ID 值
    let endID = dataLength - 20; // 當頁數為 1 時取的最後一個 ID 值
    if (clickPage > 1) {
      startID = dataLength - 21 * (clickPage - 1) + (clickPage - 2); // 當頁數大於 1 時取的第一個 ID 值
      endID = countEnd(dataLength, clickPage); // 當頁數大於 1 時取的最後一個 ID 值
    }
    latestPostRegion.innerHTML = '';
    for (let r = startID; r >= endID; r -= 1) {
      const latestPost = document.createElement('div');
      latestPost.classList.add('messageboard__latestpost');
      const { id } = data[r];
      const { content } = data[r];
      latestPost.innerHTML = `<div class='messageboard__latestpost-info'><i class="fas fa-user-circle"></i><span class='messageboard__latestpost-id'></span>${id}</div>
        <div class='messageboard__latestpost-content'>${content}</div>`;
      latestPostRegion.appendChild(latestPost);
    }
    window.scroll(0, 0);
  }
};

// 當頁面載入時
function loadMessage() {
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.responseText);
      page = Math.ceil((data.length) / 20);
      changePage.innerHTML = '';
      for (let k = 1; k <= page; k += 1) {
        const num = document.createElement('div');
        num.classList.add('messageboard__changepage-child');
        num.id = `page-button${k}`;
        num.innerText = k;
        if (k === 1) {
          num.classList.add('active');
        }
        changePage.appendChild(num);
      }
      latestPostRegion.innerHTML = '';
      for (let i = data.length - 1; i >= data.length - 20; i -= 1) {
        const latestPost = document.createElement('div');
        latestPost.classList.add('messageboard__latestpost');
        const { id } = data[i];// 與 const id = data[i].id; 相同
        const { content } = data[i];
        latestPost.innerHTML = `<div class='messageboard__latestpost-info'><i class="fas fa-user-circle"></i><span class='messageboard__latestpost-id'></span>${id}</div>
            <div class='messageboard__latestpost-content'>${content}</div>`;
        latestPostRegion.appendChild(latestPost);
      }
    } else {
      console.log('error', request.status);
    }
  };
  request.onerror = () => {
    console.log('error2', request.status);
  };
  request.open('GET', 'https://lidemy-book-store.herokuapp.com/posts?', true);
  request.send();
}

loadMessage();

// 提交新留言
newpostSubmit.onclick = () => {
  const request2 = new XMLHttpRequest();
  const storePostInputValue = encodeURIComponent(newpostInput.value);
  newpostInput.value = '';
  request2.open('POST', 'https://lidemy-book-store.herokuapp.com/posts', true);
  request2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request2.send(`content=${storePostInputValue}`);
  request2.onload = () => {
    if (request2.status >= 200 && request2.status < 400) {
      loadMessage();
    }
  };
};
