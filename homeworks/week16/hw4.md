## CSS 預處理器是什麼？我們可以不用它嗎？
CSS 預處理器（CSS preprocessor）可以將檔案（例如 SASS、SCSS）轉換成瀏覽器可以讀取的 CSS 檔案，CSS 的預處理器像是（SASS、LESS、Stylus），我們也可以不使用它，直接寫 CSS 檔案，使用預處理器是幫助我們在寫 CSS 時可以宣告一些類似變數並使用巢狀及省列分號、大括號的方式來讓我們方便管理 Style。

## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。
- ```Cache-Control:no-store```：不使用 Cache，代表每次都會發 request 去取得資料。
- ```Cache-Control:no-cache```：每次都還是會發送 request 去確認是否有新的資料，如果發現沒有新的資料就會回傳 ```304（Not Modified）```，並直接使用 cache 裡面的舊資料。

## Stack 跟 Queue 的差別是什麼？
Stack 是堆疊為一層一層疊上去所以越後面疊上去的就會先被拿取出來；而 Queue 是佇列，像是排隊的概念，先排就會先進去。

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）
權重的計算順序為：！important > inline style > ID > class／attribute > element > *
可以想成越是指定到項目本身的權重就越高，例如 ID 大過於 class，因為 ID 是唯一的；而 class 可以套用到多個項目中，或是如果我有以下 HTML 及 CSS
```HTML
// HTML
<div class='message hello title'>哈囉</div>
```
```CSS
// CSS
div.message.hello.title {
  color: red;
}
div {
  color: bule;
}
```
只要越是具體的指到該項目，該權重就越高，所以第一個 CSS 一定會覆蓋過於第二個，有點像是我如果要指出看到的犯人，越是講清楚他的特徵（例如白色帽子、黑色上衣、身高 180、皮膚略黑）一定會勝過只講戴白色帽子來的具體，警方也可能會先採用我說明的特徵。

不過也要特別注意權重計算是獨立性的，這邊指的獨立性是指當有個 CSS 指向某個 ID，之後的 CSS 就算指向同項目但是內容為五個 class，也蓋不過前面的 CSS。

## Reference
- [循序漸進理解 HTTP Cache 機制](https://blog.techbridge.cc/2017/06/17/cache-introduction/)
- [設置 CSS 與 JS 預處理器](https://developers.google.com/web/tools/setup/setup-preprocessors?hl=zh-tw)
- [Day20：小事之 CSS 權重 (css specificity)](https://ithelp.ithome.com.tw/articles/10196454)