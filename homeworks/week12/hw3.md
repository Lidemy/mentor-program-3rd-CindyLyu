## 請說明 SQL Injection 的攻擊原理以及防範方法
- ### 攻擊原理
SQL Injection 主要是針對資料庫的攻擊，利用沒有做好防護機制的程式，例如在驗證登入時使用以下 SQL 指令
```sql
SELECT * FROM users WHERE username=' . $username . ' AND password=' . $password . ' 
```
而 $username 及 $password 是用 POST 來取得，攻擊者就可以從輸入 username 輸入 ```' or 1=1 -- ``` 讓 username 一定為 true 而後面的 password 則會被註解掉，來達到不用使用任何註冊過的帳戶即可登入。

- ### 防範方法
使用 prepare statement，像是使用在 PHP 中會使用的語法如下

```php
$stmt = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?")
$stmt->bind_param('ss', $username, $password); // 將內容加進去上列準備好的指令中，第一個參數 s 代表 string，因為有兩個 string（$username、$password），所以寫兩個 s
$stmt->execute(); // 執行
```
再依據後續要如何執行來搭配其他的語法使用，就可以避免攻擊者在 $username 中輸入非預期的內容而執行非正常的登入甚至竊取資料。


## 請說明 XSS 的攻擊原理以及防範方法
- ### 攻擊原理
XSS（Cross site scripting）主要是針對網頁的攻擊，讓輸入的內容變成程式碼的一部分，例如製作了一個留言版，有 textarea 區域可以輸入內容，在未做任何防禦機制的情況下，如果攻擊者輸入了 ```<script>alert('hello hahahah')</script>``` 時，每當有使用者進入到該頁面時都會執行到這段跳出訊息視窗的程式碼，嚴重者可能偷取 cookie 內容，甚至將使用者引導去別的網站。


- ### 防範方法
在渲染畫面前先使用跳脫字元的方式過濾內容，讓像標籤的大於小於符號或是反斜線可以不被讀取到，以 PHP 為例，可使用 ```htmlspecialchars($str, ENT_QUOTES, 'UTF-8')``` 來跳脫字元。


## 請說明 CSRF 的攻擊原理以及防範方法
- ### 攻擊原理
CSRF（Cross Site Request Forgery），是一種網頁的攻擊手法，跟 XSS 不一樣，主要方式為利用使用者在 A 網站是已登入的狀態下，製作了自己 B 網站當作引誘的方式，引誘使用者進入自己的網站後開啟設下陷阱的連結，讓使用者執行了非預期的事情。
例如網站中使用了 GET 可以將留言刪除也同時會檢查登入的 session，而攻擊者利用該 GET 連結放置於他自己的網站，引誘使用者去點擊並觸發該連結的執行刪除留言。

- ### 防範方法
多設定一個 cookie 叫做 ```SameSite```，而他有兩種模式，預設值為 ```Strict```，也可以另外設定 ```Lax```，差別在於 ```Lax``` 讓 GET 取得的 request 時還是會帶有 cookie，但 POST、PUT、DELETE 不會帶上 cookie，就可以避免被駭客利用；如果使用預設值 ```Strict``` 就會連 GET 都不帶上 cookie，但在使用上會較為不方便，例如從 Google 進入到網站就需要再重新登入一次，較為麻煩。


## Reference
1. [讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
