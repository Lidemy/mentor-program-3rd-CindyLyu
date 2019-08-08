## hw2：Event Loop + Scope
Q：請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```javascript
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

A：
![1](https://imgur.com/1RiHnar.png)
- 程式開始執行
- 執行迴圈，i = 0
- 將 ```console.log('i' + 0)``` 放入 Call Stack
- 將 ```setTimeout``` 放入  Web apis 等待 0 毫秒後執行

----
![2](https://imgur.com/hRECA1Z.png)
- Web apis 的 ```setTimeout``` 完成將 console 放入 Callback Queue
- Call Stack 執行 ```console.log('i' + 0)``` 印出 i: 0
- 執行下一個迴圈 i = 1
- 將 ```console.log('i' + 1)``` 放入 Call Stack
- 將 ```setTimeout``` 放入  Web apis 等待 1000 毫秒後執行
----
![3](https://imgur.com/TwKzcdc.png)
- Web apis 的 ```setTimeout``` 完成將 console 放入 Callback Queue
- Call Stack 執行 ```console.log('i' + 1)``` 印出 i: 1
- 執行下一個迴圈 i = 2
- 將 ```console.log('i' + 2)``` 放入 Call Stack
- 將 ```setTimeout``` 放入  Web apis 等待 2000 毫秒後執行
-----
![4](https://imgur.com/pDtixy3.png)
- Call Stack 執行 ```console.log('i' + 2)``` 印出 i: 2
- 執行下一個迴圈 i = 3
- 將 ```console.log('i' + 3)``` 放入 Call Stack
- 將 ```setTimeout``` 放入  Web apis 等待 3000 毫秒後執行
-----
![5](https://imgur.com/yVsYHoS.png)
- Web apis 的 ```setTimeout``` 完成將 ```console``` 放入 Callback Queue
- Call Stack 執行 ```console.log('i' + 3)``` 印出 i: 3
- 執行下一個迴圈 i = 4
- 將 ```console.log('i' + 4)``` 放入 Call Stack
- 將 ```setTimeout``` 放入  Web apis 等待 4000 毫秒後執行
-----
![6](https://imgur.com/jx6xtcq.png)
- Call Stack 執行 ```console.log('i' + 4)``` 印出 i: 4
- 執行下一個迴圈 i = 5，發現已經超過條件（i < 5），故結束迴圈
----
![7](https://imgur.com/FxS9eQ6.png)
- 確認 Call Stack 都沒有東西了
- Event Loop 將 Callback Queue 第一個 ```console.log(i)``` 轉移到 Call Stack 裡
- Web apis 的 ```setTimeout``` 完成將 console 放入 Callback Queue
----
![8](https://imgur.com/6l0bRlp.png)
- Call Stack 執行 ```console.log(i)``` 印出 5
- 確認 Call Stack 都沒有東西了
- Event Loop 將 Callback Queue 第一個 ```console.log(i)``` 轉移到 Call Stack 裡
----
![9](https://imgur.com/rJWmBVY.png)
- Call Stack 執行 ```console.log(i)``` 印出 5
- 確認 Call Stack 都沒有東西了
- Event Loop 將 Callback Queue 第一個 ```console.log(i)``` 轉移到 Call Stack 裡
- Web apis 的 ```setTimeout``` 完成將 console 放入 Callback Queue
-----
![10](https://imgur.com/FVkxD0m.png)
- Call Stack 執行 ```console.log(i)``` 印出 5
- 確認 Call Stack 都沒有東西了
- Event Loop 將 Callback Queue 第一個 ```console.log(i)``` 轉移到 Call Stack 裡
----
![11](https://imgur.com/JYlcfJz.png)
- Call Stack 執行 ```console.log(i)``` 印出 5
- 確認 Call Stack 都沒有東西了
- Event Loop 將 Callback Queue 第一個 ```console.log(i)``` 轉移到 Call Stack 裡
----
![12](https://imgur.com/PqaBbsp.png)
- Call Stack 執行 ```console.log(i)``` 印出 5
- 確認 Call Stack 、Web apis、Callback Queue 都沒有東西了，結束
