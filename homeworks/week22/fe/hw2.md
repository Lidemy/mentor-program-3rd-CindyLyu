## React Router 背後的原理你猜是怎麼實作的？
猜測是 React 會先去找是否有 ```Router``` 的 tag 存在，然後根據設定的 ```Link``` ，只要點擊後就會觸發 ```Link``` 中的 to path，來去連接到對應的 ```Route``` 路由，再連接到 ```Route``` 設定的 component 中，而每次利用 React Router 後都會產生一個物件，包含了 history、location、match、staticContext，有點像是 log 的感覺。

> 因為這題回答起來有一種空虛的感覺XD，所以還是忍不住去查一下相關資料，不過可能就不符合這一題的猜測如何實作了，所以寫一些在稍微隱形的這裡，其實 React-Router 是依據 history 來連線的，像是在作業中使用到 withRouter 並將新的 path（post/:id) push 進去 history，Router 就會依據 history 來去這個 path

## SDK 與 API 的差別是什麼？
SDK 的全名是 Software Development Kit，可以想成是一個軟體工具包，裡面有一些程式可以方便開發使用，而 API 是 Application Programming Interface，可以想成是一個溝通的橋樑，所以 SDK 與 API 算是不同種類的東西，但可以組合使用，像是用了 SDK 中的工具後再用 API 串接一些資料。

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？
同源的話就會帶上 cookie；不同源預設是不會把 Cookie 帶上，設定方式分為 server 端及 client 端
### server 端設定
設置 header ```Access-Control-Allow-Credentials``` 為 ```true```，並注意因為設定了 Credentials 所以 ```Access-Control-Allow-Origin``` 因為安全性不能填入通用的星號 ```*```，就要填入可以允許的 domains，例如 PHP 就可以寫成以下
```PHP
<?php
  header('Access-Control-Allow-Origin: http://hello.com');
  header('Access-Control-Allow-Credentials:true');
?>
```

### client 端設定（以 JavaScript 為例）
也是需要設定 credentials 相關的內容，底下分別說明 Fetch 及 jQuery 的寫法
- Fetch：設定 ```credentials``` 為 ```include```，代表跨網域也會將 cookie 帶上，預設為 ```same-origin``` 代表只有同網域會將 cookie 帶上
```javascript
fetch('http://hello.api.php', {
  method: 'GET',
  credentials: 'include' // 新增此內容
})
```

- jQuery：新增 ```withCredentials``` 為 ```true```
```javascript
$.ajax({
    url: 'http://hello.api.php',
    method: 'GET',
    xhrFields: {
      withCredentials: true // 新增此內容
    }
})    
```

## Reference
- [react-router的实现原理](http://zhenhua-lee.github.io/react/history.html)
- [What's the difference between an API and an SDK?
](https://softwareengineering.stackexchange.com/questions/101873/whats-the-difference-between-an-api-and-an-sdk)
- [Cookie的设置、读取以及是否自动携带问题](https://juejin.im/post/5b5df0aee51d451998415485)
