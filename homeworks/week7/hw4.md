## 什麼是 DOM？
DOM 全名為 Document Object Model，文件物件模型，會將 HTML 內容轉化成有點像是物件且樹狀的形式，可以想像是瀏覽器提供的橋樑，讓我們可以利用 JavaScript 使用 DOM 去溝通並取得結點（Node）來做介面上的改變。


取得節點的方式有很多種，最常用的就是 ```document.querySelector('Selector')``` Selector 可填入與 CSS Selector 一樣的選擇方式，例如要選擇 btn 的 class 時，可輸入 ```document.querySelector('.btn')``` 來取到 btn 這個 class 的節點，再去做後續的應用，而 document 有提供很多不同種的 API 可以使用，都可以從 [MDN-Document](https://developer.mozilla.org/zh-TW/docs/Web/API/Document) 上查詢到。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件傳遞的順序大多為先捕獲再冒泡，但如果在監聽事件沒特別寫進第三個參數，就會預設是 false，也就是僅監聽冒泡的階段。
- 捕獲（Capture Phase）：由上而下，從 ```window``` 到 ```target``` 間的傳遞就稱之為捕獲階段。
- 冒泡（Bubbling Phase）：由下而上，從 ```target``` 到 ```window``` 間的傳遞就稱之為冒泡階段。


如果要查看該元素本身（target）的事件傳遞機制順序，而非其他被影響到的元素，就會依據 JavaScript 裡面寫的監聽順序來先執行捕獲或冒泡階段，也就是會依據 JavaScript 的執行順序，就不會依據先捕獲再冒泡的順序來傳遞（好像有點饒舌），簡單來說就是如果在 JavaScript 先寫下監聽冒泡的機制（addEventListener 的參數為 false），就會先執行冒泡的機制；反之亦然。

## 什麼是 event delegation，為什麼我們需要它？
event delegation 為事件代理，它可以幫助我們來統一處理一些事情，像是在 HTML 上，有一個區域為顯示各個餐廳的名稱，而餐廳名稱很多，有時會增加有時會減少，但我們想要監聽到每個餐廳的狀況，如果要等到餐廳增加再來一個一個加上監聽事件，就會很沒效率，所以這時候可以利用捕獲與冒泡的機制，利用餐廳的區域當作 event delegation，並監聽整個區域，當餐廳有增加時也會因為捕獲與冒泡的機制傳遞來一起監聽到。


以擬人化的方式來說明，可以想成小時候上課的班級，老師是整個班級的代理人，當有新轉學生進來班上時，老師會統一處理一切的事情，當有新資訊時，主任可以透過老師傳遞資訊給各個學生，就不用每個學生都去聽主任講新資訊，不然主任就會很忙，要去顧及很多的學生，有些人可能還會因為翹課而漏掉。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
### ```event.preventDefault()```
防止預設的行為，但還是會傳遞事件，例如 HTML 內容如下
```HTML
// HTML
<div class="box">
  <a href="https://google.com">我是通往 Google 的連結</a>
</div>
```

```JavaScript
// JavaScript
document.querySelector('a').addEventListener('click', 
  (e) => {
    e.preventDefault()
  }
)
```
而 JavaScript 為以上，原先點擊 a 標籤的元素後可以連結到 Google 首頁，而經過 ```event.preventDefault()``` 阻止了預設的行爲（不會連結到 Google 首頁），但還是會經過預設的冒泡傳遞到在上層的 class 名為 box 元素裡。


### ```event.stopPropagation()```
取消傳遞事件，繼續用以上 HTML 範例來說明
```HTML
<div class="box">
  <a href="https://google.com">我是通往 Google 的連結</a>
</div>
```

```JavaScript
document.querySelector('a').addEventListener('click', 
  (e) => {
    e.stopPropagation()
  }
)
```
而 JavaScript 改為以上，原先點擊 a 標籤後會預設經由冒泡傳遞事件，傳遞至 box 的 class，但加上了 ```event.stopPropagation()``` 僅會停留在自己 target 的階段裡，就不會有冒泡向上傳遞事件。


**總結 ```event.preventDefault()``` 是防止本身元素的預設行為，但不影響事件的傳遞；```event.stopPropagation()``` 是阻止事件的傳遞。**

## Reference
1. [DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)
2. [Day03-深入理解網頁架構：DOM](https://ithelp.ithome.com.tw/articles/10202689)