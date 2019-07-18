## 短網址系統設計
![架構圖](https://imgur.com/qLtl9rB.png)

項目編號可以對應到上圖中左方的編號
1. 當 URL 的 request 進來後
2. 會先進入到 Load Balance 負載均衡
3. 可能分配到兩個 server 其中一個，server 處理將網址 MD5 取前五碼
4. 寫入 Database 中 tiny_url table（table 原有欄位為 id、original_url、redirect_from，而 id 設定為 auto increment 及 primary key ）紀錄網址對應的短網址，並複製備份到另一個 Database 裡面
5. 將 Database 的資料複製到 Redis 快取的記憶體中，短網址內容為 MD5 產生的前五碼加上 id 值，讓其內容不重複，複製到 Redis 快取記憶體中是讓之後讀取短網址對應的實際網址可以更加快速

## Reference
- [資料庫的好夥伴：Redis](https://blog.techbridge.cc/2016/06/18/redis-introduction/)
- [短网址(short URL)系统的原理及其实现](https://hufangyun.com/2017/short-url/)
- [短 URL 系统是怎么设计的？](https://www.zhihu.com/question/29270034)
- [如何设计短网址系统(TinyURL)](https://cn.soulmachine.me/2017-04-10-how-to-design-tinyurl/)