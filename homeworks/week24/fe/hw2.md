## Redux 如何解決非同步（例如說 call API 拿資料）的問題
在 global state 多宣告一個 state 為 isLoading，來判斷 API 資料是否回來了，並在 call API 之前先多呼叫一個 action，將先前宣告的 state isLoading 改為 true，代表目前正在載入 API 資料，之後在 API 資料回來時一起將 isLoading 改為 false，一種插旗標示的概念。

比起上述自己動手做的方式，更好的是使用 middleware 來解決非同步的問題，middleware 是位於呼叫 action 到 reducer 之間，透過 middleware 並搭配引入其他套件像是 ```redux-thunk```、```redux-promise-middleware```，更進階的還有 ```redux-suga```、```redux-observable``` 可以幫助在解決非同步上更便利的使用並讓程式碼在後續較好維護。


## Reference
- [第二十四週課程教材](https://www.lidemy.com/courses/528745/lectures/9643255)
- [Day 24 - 二周目 - Redux 如何發出非同步 action：引入非同步 middleware](https://ithelp.ithome.com.tw/articles/10204829)