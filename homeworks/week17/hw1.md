## hw1：Event Loop
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

A：
![1](https://imgur.com/R0qiilW.png)
- 將 Line 1 的 ```console.log(1)``` 放入 Call Stack
- 將 Line 2 的 ```setTimeout``` 移至 Web apis 等待 0 毫秒後執行
------
![2](https://imgur.com/sMFbCWx.png)
- 執行 Call Stack 印出 1
- 將 Line 5 的 ```console.log(3)``` 放入 Call Stack
- 將 Line 6 的 ```setTimeout``` 移至 Web apis 等待 0 毫秒後執行
- 將 ```console.log(2)``` 移至 Callback Queue
------
![3](https://imgur.com/jyhInEd.png)
- 執行 Call Stack 印出 3
- 將 Line 9 的 ```console.log(5)``` 放入 Call Stack
- 將 ```console.log(4)``` 移至 Callback Queue
------
![4](https://imgur.com/N5Vyre3.png)
- 執行 Call Stack 印出 5
- 確認 Call Stack 沒有東西
- Event Loop 將 Callback Queue ```console.log(2)``` 轉移到 Call Stack 裡
------
![5](https://imgur.com/tN8H1jv.png)
- 執行 Call Stack 中的 ```console.log(2)``` 印出 2
- 確認 Call Stack 沒有東西
- Event Loop 將 Callback Queue ```console.log(4)``` 轉移到 Call Stack 裡
------
![6](https://imgur.com/JPYEPgY.png)
- 執行 Call Stack 中的 ```console.log(4)``` 印出 4
- 確認 Call Stack 、Web apis、Callback Queue 都沒有東西了，結束
