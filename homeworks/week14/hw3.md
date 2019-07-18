## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS 為 Domain Name System，DNS 會將域名（例：google.com）轉成 IP 位址（例：92.35.62.152）來做串連
關於 Google 提供的公開 DNS 對於我們的好處是可以免費使用，且速度更快，當原本使用的 DNS 壞掉時，就可以使用 Google 的；而對於 Google 的好處是他可以藉由轉換來搜集一些資訊，當使用者使用了 Google 的 DNS 後，上網查詢一些東西，都可以被 Google 知道，Google 就可以收集這些資訊來做一些應用。

## 什麼是資料庫的 lock？為什麼我們需要 lock？
因為有 race condition 的影響，所以會需要使用 lock，而 lock 資料庫的方式，以搶票為例，為當接收多個 request 訂單時，會影響剩餘票數的欄位，這時就可以先以接受第一個 request 時 lock 住剩餘票數的欄位，等處理完後才能執行下一個 reuqest。
> race condition 是指當多個 request 在同個時間發出，對資料庫可能會有錯誤的影響，例如在某時段開放搶票，因為 race condition 造成超賣的情況。

以 PHP 為例，可以先將資料庫的類型更改為 innoDB（MyISAM 是不支援 transaction 的，而 lock 要在 transaction 裡面才能使用），程式碼範例如下：
```php
$conn->autocommit(FALSE); // 先將自動 commit 關掉
$conn->begin_transaction();
$conn->query("SELECT amount FROM products where id=1 for update"); // 主要需加上 for update，在執行的時候就會將 id=1 這個 row 先凍結起來，如後續有一樣的 query 要執行時就會先將此 query 執行完才能再次執行
$conn->commit();
```

## NoSQL 跟 SQL 的差別在哪裡？
|  | SQL | NoSQL（Not only SQL） |
| -------- | -------- | -------- |
| 類型 | 關聯式資料庫 |非關聯式資料庫 |
| 有無結構（Schema） | 有 | 無
| 存取方式 |使用指令篩選出 table 的資料|使用 Key-value，且資料庫內容為 JSON 的形式
| 適用情況 | 有固定且相同欄位的資料（例：會員資料） | 無法定義固定的資料欄位（例：Log）
| 使用此類型的資料庫 |MySQL、PostgreSQL、MariaDB|MongoDB、Microsoft SQL Server

## 資料庫的 ACID 是什麼？
為了確保資料庫中的 transaction 正確，所以必須符合 ACID 的特性，以下分述 ACID 內容： 
- Atomicty 原子性：確保 transaction 內的操作全部都成功，不然就全部失敗，如果當機時且 transaction 尚未被 commit 就需要 Rollback 回滾到最初的狀態
- Consistency 一致性：維持資料的一致性，例如 A 和 B 的帳戶金額加起來總共 300 元，而 A 轉帳給 B，最後帳戶的總額還是要等於 300 元
- Isolation 隔離性：多筆交易不會互相影響（不能同時改到同一個值），就是要避免 race condition 的影響
- Durability 持久性：交易成功後，寫入的資料不會不見，並永久的保存在數據中

## Reference
- 程式導師實驗計畫：Lesson 8-3 之 hw8 作業檢討
- [閃開！讓專業的來：SQL 與 NoSQL](https://ithelp.ithome.com.tw/articles/10187443)
- [RDBMS 課程（先修課）](https://github.com/TritonHo/slides/blob/master/Taipei%202018-06%20talk/lesson0.pdf)
- [acid （数据库事务正确执行的四个基本要素的缩写）](https://baike.baidu.com/item/ACID/10738)
- [ACID-維基百科](https://zh.wikipedia.org/wiki/ACID)