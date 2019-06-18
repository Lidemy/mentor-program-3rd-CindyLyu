## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
都是存字串，通常會用 VARCHAR 存比較短的內容，可以設定長度，且會花費 1~3 字節來儲存它的長度，例如 username；而 TEXT 則是拿來存比較長的內容，像是文章，不能設定長度，不會花費字節來儲存長度。




## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？
Cookie 是個小型文字檔裡面可以存放一些資訊來辨識使用者，Server 可以要求設置 Cookie，當之後有新的 request 要發送給 Server 時，瀏覽器也會一起把 Cookie 的資訊帶去給 Server。
瀏覽器會以包含 Cookie 的名稱、value、時效、path、domain 的內容帶去給 Server。




## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
- 密碼似乎不能這樣存在資料庫裡面，但還不太確定實際原因是什麼
> 因為之前工作有請工程師幫我查密碼，但他們說他們看不到密碼，好像也解開以前一直以來好奇工程事是否可以看到大家的帳戶密碼這件事，雖然直覺告訴我不能這樣直接存密碼在資料庫應該也不只是單純不讓工程師看到而已，應該還有其他原因

- 密碼強度不夠，讓使用者如果取兩位數的密碼也可以通過
> 但這可能只是存在我的留言板機制沒做好XD

- 沒有使用 HTTPS，似乎不安全




## Reference
- [HTTP cookies - MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies)
- [PHP setcookie() 函數](http://www.w3school.com.cn/php/func_http_setcookie.asp)
- [Node.js](https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_response_setheader_name_value)
- [[BE101] 用 PHP 與 MySQL 學習後端基礎](https://www.lidemy.com/courses/390611/lectures/8553732)
- [MySQL之char、varchar和text的设计](https://www.cnblogs.com/billyxp/p/3548540.html)