## 請解釋後端與前端的差異。
1. 前端與後端的差在當使用者使用一個網站平台時，看到的介面內容幾乎都是前端在負責製作的，當有發送 request 時就會使用到後端負責的部分，像是資料庫、Server，來回傳對應的內容。
2. 前端與後端使用的程式語言也不同，像是前端可能會使用 HTML、CSS、JavaScript，後端則可能使用到 SQL、MongoDB，但因為需要互相合作配合，所以大部份的前端還是會稍微了解後端的一些作業；反之亦然。


## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
1. 搜尋 JavaScript 
2. 瀏覽器將「搜尋 JavaScript 的關鍵字」這個需求發送到後端的伺服器上
3. 伺服器與資料庫連線來查找資料
4. 伺服器將比對到的資料回傳前端
5. 依據前端的程式（像是 HTML、CSS、JavaScript）來組合顯示出結果在瀏覽器上


## 請列舉出 3 個 command line 指令並且說明功用
Command Line 指令 | 說明功用 
----------- |----------  
```exit``` | 關閉 CML 程式 
```tail test.md``` | 顯示 test.md 檔案內容的最後幾行出來 
```file test.md``` | 顯示 test.md 檔案的類型，例如：test.md: UTF-8 Unicode text 


### 參考資料
- [Linux Command 命令列指令與基本操作入門教學](https://blog.techbridge.cc/2017/12/23/linux-commnd-line-tutorial/)



