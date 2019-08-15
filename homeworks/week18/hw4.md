## gulp 跟 webpack 有什麼不一樣？我們可以不用它們嗎？
- webpack 比較偏向將東西模組化；而 gulp 則是在簡化工作流程，編寫多個 task，像是 Sass 的轉譯成 css，而 webpack 也可以完成 Sass 的轉譯，這兩個工具能做的事情有點相似，但執行的原理不同
- 我們可以不使用 gulp 及 webpack，但就沒辦法幫助我們簡化工作了，因為像是 gulp 可以寫下不同的 task，來幫我們做 Sass 轉譯、css 及 JavaScript 壓縮等工作，如果不使用這些工具，就變成是自己要去做轉譯及壓縮等工作，會很沒效率

## hw3 把 todo list 這樣改寫，可能會有什麼問題？
- 猜測當陣列中的資料一多的時候，會造成 render 時很消耗資源
- 針對標註已完成、刪除項目、取消標註已完成，自己使用了迴圈來跑 id 找到陣列中的 index 值，當陣列內容一多，每次迴圈都要跑個一大圈，覺得也是會消耗較多的資源，可能不是個很好的做法

## CSS Sprites 與 Data URI 的優缺點是什麼？
- CSS Sprites 是將圖片整合成一張圖片，例如 [Google](https://ssl.gstatic.com/gb/images/i1_1967ca6a.png) 將 Logo 及各個 icon 整合在一張圖，之後要使用時利用 CSS 的 ```background-image```、```background-repeat```、```background-position``` 來判斷要顯示哪個部分來顯示對應的圖
    - 優點
        - 減少 HTTP request，不用為了讀取每張圖片時而在下載每張圖片時發出一個 HTTP request
    - 缺點
        - 需要設計師將多個圖片組合成一張圖並且預留好顯示的位置，再與程式溝通好對應的顯示位置

------------------------------------------------

- Data URI 是將圖片經由 base64 編碼之後，以文字的方式儲存該圖片，例如下圖
    - 優點
        - 減少 HTTP request，雖然經過 base64 編碼後的檔案會比原始檔案大小還大，但因為減少 HTTP request，整體會讓網站的載入較快
    - 缺點
        - 無法讓瀏覽器快取該圖片
        - 圖片更新的話就需要重新編碼
        - 易讀性差，因為經過 base64 編碼，無法從檔案名稱判斷圖片內容，且在嵌入時會讓 CSS 或 HTML 變得凌亂

![](https://i.imgur.com/dFjUrB9.png)

## Reference
- [CSS Sprites](https://www.wibibi.com/info.php?tid=373)
- [Data URI 前端優化](https://medium.com/cubemail88/data-uri-%E5%89%8D%E7%AB%AF%E5%84%AA%E5%8C%96-d83f833e376d)
- [[技術文章]駭客級的網站優化技巧：DATAURISCHEME](https://www.awoo.com.tw/blog/dataurischeme/)
- [淺嚐Data URI](https://blog.darkthread.net/blog/data-uri)