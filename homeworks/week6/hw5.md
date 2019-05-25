## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
-  ```<hr>``` 顯示分隔線
-  ```<strong>``` 將字變成粗體
-  ```<select>``` 顯示一個下拉式選單
-  ```<textarea>``` 顯示一個可以輸入內容的地方
-  ```<sup>``` 將後面內容顯示於上標，例如 5<sup>2</sup>
- ```<sub>``` 將後面內容顯示於下標，例如 5<sub>2</sub>

## 請問什麼是盒模型（box modal）
在瀏覽器上在頁面上點擊右鍵，點選「檢查」，可於右邊 CSS Styles 頁籤捲軸到最底的地方可以看到 box model，像是下圖，可以從圖中查看不同元素的 padding、margin、border，也可以將游標移至 box model 上的不同顏色區域，來看對應出頁面上的 padding、margin、border 的位置，是個很方便用來除錯的小工具。
![boxModel](http://img.mukewang.com/543b4cae0001b34304300350.jpg)

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
將 inline、block、inline-block 差別製作成表格說明

| display 屬性 | inline | block | inline-block |
| -------- | -------- | -------- | ------- |
| 使用時機 | 要讓元素間並排時使用 | 使用標題時，因為想讓標題佔一整行，或是一個段落時使用     | 要將元素間並排卻也能調整元素間的距離時可使用，像是按鈕或是分項目類別與子類別的下拉式選單，就有可能放在同一行 |
| 預設此屬性標籤 | ```<span>```、```<a>``` | ```<p>```、```<div>```、```<h1>``` |  ```<button>```、```<input>```、```<select>```  |
| 會佔一整行的空間嗎? | 不會     | 會     | 不會    |
| 可使用 padding 嗎？ | 僅能左右 padding，上下 padding 不會影響到內容位置的變化     | 可以     | 可以    |
| 可使用 margin 嗎？ | 僅能左右 margin     | 可以     | 可以    |
| 可使用 width 嗎？ | 否（會依據內容的寬而顯示）     | 可以     | 可以    |
| 可使用 height 嗎？ | 否（會依據內容的高而顯示）     | 可以     | 可以    |

註： inline-block 與 block 最大的差別差在多個 inline 讓其能夠並排顯示。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
差在定位的方式，以下分別做說明
1. static：預設的 position，由上而下做排序，如果是 ```display: inline;``` 就會顯示在同一行，由左至右，無法使用 left、right、top、bottom 去移動它。
> 使用場合：要讓元素依序排列下來，不用做任何特殊位置的變化時使用，像是 FB 動態消息的各貼文由上到下排序下來，也可以不用特地寫，因為預設 position 就是 static

2. relative：相對定位，會依據上個元素來依據自己有的 left、right、top、bottom 屬性去顯示到相對的位置，會被上個元素所影響。
> 使用場合：常用於給下層的 ```position: absolute;``` 做定位參考

3. absolute：絕對定位，當某元素設定了 ```position: absolute;``` 就會往上層去找到可以定位的元素（非 static 的定位屬性）並在找到的該層內做絕對定位，如果上層都沒有非 static 的屬性，就會直接依據整個 body 來做絕對定位。使用 absolute 較常直接在上一層加上 ```position: relative;``` 來做定位參考。
> 使用場合：像是將關閉的 X 圖示是做在彈窗右上角時，或是如下圖紅框處「查看全部」連結，也適合用 absolute 來做絕對定位

![fanpage](https://i.imgur.com/Q00ny5y.png)

4. fixed：絕對定位，使用 fixed 定位後會常駐顯示於 viewport 的同一個位置上，就算捲軸左右捲動後也還是會顯示於同一個位置上。
> 使用場合：常用於導覽列、一些網頁會於左右放置的廣告，因為當捲軸滑動時也還要能夠看到，所以會將其固定在 viewport 上。

註：設定絕對定位的屬性（absolute、fixed）後，該元素的 height、width 會依據其內容的高度與寬度來撐開，可以再透過 top、bottom 來設定 height；或是透過 left、right 來設定 width，像是用於導覽列 ```position: fixed;``` 後可能會變成短短一截，就可以使用 ```left: 0px;``` 及 ```right: 0px;``` 或直接使用 ```width: 100%;``` 讓導覽列的 width 符合瀏覽器的寬度。

## Reference：
1. [[FE101] 前端基礎：HTML 與 CSS](https://www.lidemy.com/courses/390445/lectures/5958347)
2. [CSS 屬性 display 的值 inline block inline-block none](https://blog.xuite.net/vexed/tech/29221717-CSS+%E5%B1%AC%E6%80%A7+display+%E7%9A%84%E5%80%BC+inline+block+inline-block+none)
3. [HTML5 标签列表
](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list)
4. [position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
