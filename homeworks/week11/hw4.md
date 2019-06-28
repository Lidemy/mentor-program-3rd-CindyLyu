## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
- 雜湊無法透過逆向解出原始輸入內容（雜湊不可逆）；而加密可以透過密鑰去解開（加密可逆）
- 密碼要透過雜湊後才存入資料庫的原因是因為如果直接把密碼存入資料庫時，當資料庫被駭客入侵後就可以直接看到明碼並拿去做壞事，而透過雜湊後才存入資料庫就可以降低駭客在入侵資料庫時，直接看到明碼，也增加駭客要看到密碼的一個關卡

## 請舉出三種不同的雜湊函數
**PHP 雜湊函數**

MD5：```md5($str)``` 會輸出 32 字元長度的內容
SHA-1：```sha1($str)``` 會輸出 40 字元長度的內容
SHA-256：```hash('sha256', $str)``` 會出現 64 字元長度的內容，比起上述兩個雜湊函式此函式較為被廣泛應用

## 請去查什麼是 Session，以及 Session 跟 Cookie 的差別
- Session 是一個概念，通常用於辨識使用者，類似一個通行證的感覺，且用資料庫來儲存相關資料，沒有時效性，除非刻意將資料刪除
- Cookie 是一個小型的文字檔，可以存放資訊，並且放在瀏覽器的 client 端，並且有時效性，通常會將 session 資訊存在 cookie 中，但敏感資訊最好經過處理在存放在 cookie 中會比較好，因為 cookie 可以被用戶來做竄改

##  `include`、`require`、`include_once`、`require_once` 的差別
```include``` 及 ```require``` 均為引入檔案用，差別為以下

|  | ```include``` | ```require``` |
| -------- | -------- | -------- |
| 使用情況     | 引入動態內容     | 引入靜態內容     |
| 是否可用於迴圈 | 是 | 否 |
| 發生錯誤時是否會停止後續的程式碼執行 | 否（會顯示警告） | 是 |

而 ```include_once``` 及 ```require_once``` 多了 once 代表只會引入一次，在引入檔案時會先檢查前面是否已引入過，如果有就不會再次引入檔案造成重複的情況。

## Reference
1.[PHP sha1](https://www.php.net/manual/en/function.sha1.php)
2.[PHP md5](https://www.php.net/manual/en/function.md5.php)
3.[MD5, SHA1, SHA224, SHA256, SHA384, SHA512 and RIPEMD160 hash generator](https://www.mobilefish.com/services/hash_generator/hash_generator.php)
4.[PHP 雜湊加密演算 sha256、sha224、sha512....](https://adon988.logdown.com/posts/2513425-php-hash-sha256-sha224-sha512)
5.[會員系統用Session還是Cookie? 你知道其實他們常常混在一起嗎？](http://syunguo.blogspot.com/2013/04/phpinclude-require.html)