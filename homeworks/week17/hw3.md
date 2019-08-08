## hw3：Hoisting
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

A：
模擬 JavaScript 引擎來跑以上程式碼（以下 Execution Contexts 簡稱 EC；Variable Object 簡稱 VO；Activation Object 簡稱 AO），VO 適用於全域的 EC；而 AO 適用於 function，他們很相似，僅有細微的差異

- global EC 的編譯
```
globalEC: {
  VO: {
    a: undefined,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
```
- global EC 的執行（執行 a 的賦值）
```
globalEC: {
  VO: {
    a: 1,
    fn: function
  },
  scopeChain: [globalEC.VO]
}
```
- Line 16 遇到 fn 的 function，先將 fn EC 編譯
```
fnEC: {
  AO: {
    a: undefined,
    fn2: function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}
```
- fn EC 開始執行

- Line 3：```console.log(a)``` 在 fnEC.AO 找到 a 印出 undefined
- Line 4：```a = 5``` 執行 a 的賦值，a 變成 5
```
fnEC: {
  AO: {
    a: 5,
    fn2: function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}
```
- Line 5：```console.log(a)``` 在 fnEC.AO 找到 a 印出 5
- Line 6：```a++```，在 fnEC.AO 的 a 變成 6
- Line 7：```var a```，在 fnEC 查詢到 a 已經宣告過，故此行無作用
- Line 8：```fn2()```，進入 fn2EC 編譯（直接結束，因為沒有需要編譯的東西），進入 fn2EC 執行
- Line 11：```console.log(a)``` 在 fn2EC.AO 找不到，故往上層 fnEC.AO 找到 a 印出 6
- Line 12：```a = 20``` 因 fn2EC.AO 沒有 a，故往上層找，找到 fnEC.AO 有 a，將值變成 20

```
fnEC: {
  AO: {
    a: 20,
    fn2: function
  },
  scopeChain: [fnEC.AO, globalEC.VO]
}
```
- Line 13：```b = 100``` 因 fn2EC.AO 沒有 a，故往上層找，都沒有，所以在 globalEC.VO 新增 b，並賦值 100

```
globalEC: {
  VO: {
    a: 1,
    fn: function,
    b: 100,
  },
  scopeChain: [globalEC.VO]
}
```
- Line 9：```console.log(a)``` 在 fnEC.AO 找到 a 印出 20，fnEC 執行完畢，故 fnEC 內容釋放掉
- Line 17：```console.log(a)``` 在 globalEC.VO 找到 a 印出 1
- Line 18：```a = 10``` 在 globalEC.VO 找到 a 將值更改為 10
- Line 19：```console.log(a)``` 在 globalEC.VO 找到 a 印出 10
- Line 20：```console.log(b)``` 在 globalEC.VO 找到 b 印出 100
- 都執行完了，故釋放掉 globalEC
