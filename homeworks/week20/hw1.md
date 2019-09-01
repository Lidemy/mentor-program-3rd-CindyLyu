## 十六到二十週心得
### 前言 murmur
這次是最後一次的複習週，有點像是要大學畢業前最後的暑假，會有點焦慮，但比起之前在學快畢業的不安感少了一點及更踏實了一些，可能是比起以前更有目標跟方向了。


### 第十六週：前端中階（上）
> 學習時數：35 小時

這週學習覺得比較輕鬆一些，除了物件導向的使用，覺得還沒有到可以很靈活使用，還是要看一下筆記。


### 第十七週：前端中階（中）
> 學習時數：40 小時

這週的教材，除了影片，還有一些文章，其中記得看某一篇文章看到中途心想為何文章頁面捲軸滑不完的感覺（超沒耐心XD），但不得不說都是好文，長文也是因為要把脈絡講清楚吧我想，所以好文值得心平氣和花時間去閱讀，這週了解到了原來需要 hositing 是因為如果沒有 hositing 的話就沒辦法達成 function 的互相呼叫了，hositing 在先前忘記哪一週學習時還不知道需要 hositing 的原因。


### 第十八週：前端中階（下）
> 學習時數：39 小時

這週就是到處尋找 sample 語法來使用，以及看官方的文件，不過大多還是都參考別人寫的文章，反思找資料的順序應該要先看官方文件，沒辦法理解的話再去找其他人寫的文章覺得會比較好。


### 第十九週：網路基礎複習
> 學習時數：40 小時
（看完導讀以為這週超級輕鬆還覺得有點擔心會不會過太爽，因為下週也是複習週，後來去寫作業發現超級難剛開始很沒頭緒，也以為自己會寫不出來，完成後覺得有點感人）

這週的作業要寫個基本的 API 及串接，寫完後對於要接收 PATCH（編輯資料）這種 Method 的 request 需使用 ```parse_str()``` 及 ```file_get_contents("php://input")``` 才能得到要編輯資料的方式很不解，因為我覺得為什麼不能直接跟之前一樣用 POST 取得資料就好了呢，於是找了這兩個函式的 PHP 相關資料，沒有發現什麼資訊，很多文章也只寫就是要用這個方式，沒有提到原因，後來看到一篇 [文章](https://lornajane.net/posts/2008/accessing-incoming-put-data-from-php)，引用如下
> I wrote code to handle a POST request and used the variables I found in $_POST. Then I tried to write a PUT request.
PHP doesn't have a built-in way to do this, and at first I was a little confused as to how I could reach this information. It turns out that this can be read from the incoming stream to PHP, php://input.

原本蠻不以為意的，去實驗過後加上再回來看這篇文章才發現應該是因為 PHP 沒有提供給 PATCH 或是 PUT 這種 Method 來獲取資料的方式，不像是 GET 可以用 ```$_GET``` 或 POST 可以用 ```$_POST```，所以才需要用 ```parse_str()``` 及 ```file_get_contents("php://input")``` 來取得資料，當然後續覺得也是可以用 POST 的方式來編輯資料，但就更遠離 RESTful API 的風格了。

這週去研究拖了好久的 $('.test') 與 document.querySelector('.test') 的差別，也是想更了解 jQuery 的 event 抓出來的內容是什麼，後來查到這一篇 [document.getElementById vs jQuery $()
](https://stackoverflow.com/questions/4069982/document-getelementbyid-vs-jquery#targetText=Calling%20%24('%23id'),%24('%23id')%20) 才知道原來 jQuery 第 0 個元素就等於用 document.querySelector 選取的，就是一個是 return DOM Object，一個是 return jQuery Object，但好像用觀察的也能夠觀察的出來 jQuery 第 0 個元素與 DOM 抓出來的東西是一樣的，不知道自己在幹嘛XD

第十九週自我檢測提到了 MVC 與路由，我覺得路由跟 controller 有點相似，也應該說目前應用在程式上還不知道如何劃分，沒有很深刻的體悟，但想說之後學框架應該就能夠瞭解了，等之後學完框架不懂再來問。


### 第二十週：複習週
這週有一次的直播，覺得每次直播都會被同學問的閒聊問題或是 Huli 還可以認真回答這些問題給笑死XDD，但還是很感謝老師願意開這麼多次直播來回答我們各種疑難雜症。

複習第十七週時意外的花比較多時間複習，在複習 hositing 時，試著答之前課程的題目如下
```javascript
var a = 1;
function test(){
  console.log('1.', a);
  var a = 7;
  console.log('2.', a);
  a++;
  var a;
  inner();
  console.log('4.', a);
  function inner(){
    console.log('3.', a);
    a = 30;
    b = 200;
  }
}
test();
console.log('5.', a);
a = 70;
console.log('6.', a);
console.log('7.', b);
```
居然還是有些答錯，代表自己還是有不熟悉的地方，後來再去複習一步一步建立 Execution Context 編譯到執行，就可以再次慢慢理解這個題目對應的答案，決定等計畫結束要去找工作前還要再來想一次這個題目看自己是否有真正學習起來。

#### 關於 lazy-hackathon 網站的優化
弄到後期覺得很挫折，可能是覺得這不應該是很難的一件事情，但卻弄很久一部分弄不好想當然結果也不是很滿意，嘗試了以下優化方法
1.  bootstrap、jQuery 這類型的連結換成 CDN 引入連結的方式
2.  html 的冗餘註解刪除
3.  將全部圖片丟去 [squoosh](https://squoosh.app/) 在不影響視覺上的畫質範圍內壓縮檔案大小
6.  html 的圖片用 Webpack 轉成 Data URI
7.  原先將 CSS 和 JavaScript 用 Webpack 打包起來，但覺得打包後的檔案太大，改用 gulp 將 CSS 和 JavaScript 檔案分別壓縮（比 Webpack 打包後的大小小一些）
8.  CSS 中使用到的圖片用 Webpack 轉換成 Data URI 
9.  後來將 CSS 與 JS 分開，其中 CSS 分成兩部分，一部分為一打開網頁會先看到的部分，一部分為要捲動捲軸看到的畫面，後者 html 引入 script 連結時用 async 來讓網頁載入快一點
10.  後來還是覺得轉換成 Data URI 的 JS 檔案太大，之後嘗試將圖片用 Webpack 轉換成 CSS Sprites

挫折感大概是一些細小的地方處理不好，失敗及需要再深入研究的內容如下
1. html 的圖片用 Webpack 轉化成 Data URI 失敗
2. CSS Sprites 還研究不出來要如何與現有的 CSS 或 SCSS 融合使用
3. gulp 搭配了 ```gulp-postcss``` 將 SCSS 轉換成 CSS 及壓縮（小部分內容先手動修改，因為其中的 postcss 對於 SCSS 檔案中的 ```mask-image: url('./../image/'+ $icon-url);``` 會失敗，覺得是還不夠瞭解這個語法及 PostCSS 所以失敗）
4. CDN 的一些作用原理可能需要再研究，發現引入 slick 的 css 和 JS 在 local 端會無法使用，如果上傳到部署的網站就會正常可以使用，看起來是需要用到伺服器，但記得之前引入 bootstrap、jQuery 的 CDN 都沒有此問題


目前大概可以降低一半的載入速度，不過覺得還是很不夠，看 Dev Tools 中的 Network 目前最花時間也是檔案大小較大者為 html 中的圖片及打包後的 CSS，所以最需要先解決以上的第一二點，但因為卡的有點挫折應該會決定先往下週進行，之後再找時間來完成這週的優化網站。
