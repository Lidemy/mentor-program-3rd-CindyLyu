## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。
有！但自己感覺還沒有到很深入了解每一個東西，像是 this、prototype，但這週學完的感想是覺得很奇妙（每週好像都在說很奇妙XD），奇妙的點大概是以下
- 有些東西可以串連在一起，像是 Execution Contexts 的編譯和執行就可以一起解釋了 hositing 和 scope，串連在一起理解的感覺很棒！
- 之前在查一些函式都會在 MDN 看到 prototype，終於在這週認識了它
- 原本一直很糾結原型鍊有提到可以將 ```Dog.prototype.sayHello``` 改寫成 ```Object.prototype.sayHello``` 好奇是為什麼？而且這樣要怎麼樣讓它往上層找的時候知道這個 sayHello 就是 Dog 的呢？後來看 JS201 將 string 拿來做範例才發現，原來看得只是一個型態，所以也不在乎它是不是 Dog 的

覺得這週的學習教材也蠻多的，剛開始看完第二期影片就是超級粗淺的了解，在看完文章後感覺有多了一點點的了解（除了 V8 還很模糊，可能要再多研究），再看最後的 JS201，就是再多了很多的了解，但覺得 JS201 其實跟前面包含文章的內容講的東西大致差不多（？），當然細微可能還是有一點差異，所以覺得大概是多看幾遍就可以更瞭解的概念。

> 這週上課提到 Excution Contexts 時會一直提到 VO，就會一直聯想到 [B.O](https://www.youtube.com/watch?v=MHKnSFlDBLQ) 這首歌XD

----
#### 覺得還可以研究的項目
- 對於 prototype 的認識還是有點空泛的感覺，可能還要再研究除了應用在 ES5 的物件導向還可以應用在哪裡
- this 值在 node.js 和瀏覽器上對於全域變數（global、window）的界定好像不一樣，因為以下程式碼在兩者執行會有不同的結果，前者為 undefined；後者為 2
```javascript
var value = 2
function hello() {
  console.log(this.value)
}
hello()
```
