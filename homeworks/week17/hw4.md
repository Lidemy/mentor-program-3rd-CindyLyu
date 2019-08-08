## hw4：What is this?
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

A：
因為 this 的值是看呼叫的方式（除了 arrow function 例外），有個小撇步是可以將其 function 轉換成 call 的形式，而 function 前的內容帶入到 call 的第一個參數，也就會是 this 的值，有點像是誰用了這個 function，this 就會指向誰
- ```obj.inner.hello()```
轉換成 call => ```obj.inner.hello.call(obj.inner)```，故 this 指向 obj 的 inner，印出的內容為 2，也可以將直接單獨看 inner 內容成以下
```javascript
var value = 2
function hello() {
  console.log(this.value)
}
hello() // 印出 2
```
- ```obj2.hello()```
轉換成 call => ```obj2.hello.call(obj2)```，而 obj2 其實就有被定義等同於 ```obj.inner```，故與上一個答案一樣。
- ```hello()```
轉換成 call => ```hello.call(undefined)```，因為 hello 前面沒有其他內容，所以為 undefined。
