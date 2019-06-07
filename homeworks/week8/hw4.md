## 什麼是 Ajax？
非同步與伺服器交換資料都可稱為 AJAX。

## 用 Ajax 與我們用表單送出資料的差別在哪？
AJAX 是用於非同步的載入技術，且可以達到不換頁的效果，像是在 Google 首頁中於搜尋欄位輸入關鍵字時，會出現下拉式的一些選項可以提供作選擇，或是 Gmail 中寫信完成後沒有換頁的狀況下送出，就是使用 AJAX，如果用表單送出資料就會需要將 request 送到另一個頁面，server 再回傳 response 回來。

## JSONP 是什麼？
全名為 JSON with Padding，僅能在網址上加上參數（GET 的方式），利用 ```script``` 標籤引入該 API 網址，然後利用該 API 已經寫好的 function 來使用並匯入資料，可以讓該 request 不受同源政策的影響（像是如下範例），是一個很奇妙的方式，但現在比較少人在用。
```HTML
// HTML
<script>
  function setData(users) {
    console.log(users)
  }
</script>
<script src='http://test.com/user.js'></script>
```
```javascript
// JavaScript
setData([
  {
    id: 1,
    name: ‘hello’
  }, {
    id: 2,
  }
])
```

## 要如何存取跨網域的 API？
必須符合瀏覽器的同源政策，或是 response 的 server 有設定 CORS，CORS 為跨來源資源共用，CORS 就是當有在 server 的 headers 設定 ```access-control-origin``` 並寫下同意哪些來源可以使用，符合的話瀏覽器才會放行 request 給 server，或有些會直接在 ```access-control-origin``` 設定 ```*``` 代表任何來源都可以發 request。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
> 其實剛開始在看到這一題時，直覺是第四週不是也有跨網域嗎？QQ（因為從自己電腦本機發送 request 到串接作業中 twitch api 時應該也算是跨網域（？）

後來再去稍微複習一下課程想想，覺得這一題可能是要問同源政策，所以這週碰到的原因應該是因為這週學習了透過瀏覽器發送 request，而第四週是使用 node.js，在使用瀏覽器發送 request 時，瀏覽器會有同源政策的規範，也會幫我們在 request 上加上一些資訊一起傳送給 server，根據同源政策，也會讓瀏覽器去審核我們是否與 server 是同個 domain，且 http 或 https 也要相同， port 也是；而直接用 node.js 就不會有瀏覽器同源政策的影響，因為沒透過瀏覽器，是直接用 JavaScript 發送 request 給 sever。
