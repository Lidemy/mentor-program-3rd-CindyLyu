const firstPage = document.querySelector('.messageboard__page>.messageboard__page-child');

// getCookie function 來源為 https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const page = getCookie('page');
const currentPage = document.querySelectorAll('.messageboard__page-child')[page - 1];

if (!page) {
  // 一開始預設為第一頁
  firstPage.classList.add('active');
}

currentPage.classList.add('active');
