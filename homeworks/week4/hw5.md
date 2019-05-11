## 請以自己的話解釋 API 是什麼
API 叫做應用程式介面全名為 Application Programming Interface，可以把 API 想像是個 24 小時運作不休息的傳輸帶，主要負責運輸需求及回傳內容，應用在生活上像是當要使用電腦時按下開機鍵，API 就會將開機的需求傳送至電腦的作業系統來執行開機，並利用 API 回傳顯示畫面回來。

至於應用在程式上的話像是當我有個購物網站想要新增一個金流的功能，讓使用者可以在我的網站上付款買東西，如果要自己從無到有做一個可以付款、收款，甚至跟銀行端有密切聯繫的功能，可能會礙於法規甚至需要龐大的心力才能做出來，這時就可以直接與有提供金流 API 服務串接的廠商合作，像是「綠界科技 ECPay」，串接後就可以讓使用者在我的網站上購物後付款，也藉由完成串接 API 且使用者付款完成後回傳結果來得知使用者是否付款完成，然後做後續的對應動作。

有提供 API 服務的公司通常都會公開一份有關 API 的文件，來告訴大家要如何使用他們的 API，有點像是要遵守他們的規則，才能拿到資料或使用對應的功能。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
- 413：Request Entity Too Large，使用者發出的 request（像是上傳檔案的容量） 超過可以承受的檔案容量時出現的錯誤碼，可以在使用者上傳檔案時告知容量太大的警示。
- 403：Forbidden，權限不足被拒絕，並在該錯誤頁面一併顯示原因，如果不想顯示原因的話可以轉向顯示錯誤 404。
- 502：Bad Gateway，伺服器或某服務出了錯誤顯示的錯誤碼。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。
必須有合作的關係才有帳戶（內含密碼用於存取 API 上）

### URL

https://lidemy.learingCode.com/api


## 獲取餐廳資料

| 說明 | Method | path | 範例 |
|------------| --- | ------------ |--------|
| 所有餐廳資料 | GET | /restaurants | - | 
| 單一餐廳資料 | GET | /restaruants/:name | /restaruants/GoodGoodEat |


#### 回傳範例 
```javascript
{
  "data":{
    "id": "4849527",
    "name": "GoodGoodEat",
    "phone": "(03)2345678"
    "region": "Taipei",
    "category": "barbecue",
  }
}
```

## 其他
|   說明    | Method | path             | 參數 |
|----------|--------| ----------------- |--------|
| 新增餐廳資料 | POST | /resaturants | name : 餐廳名稱（Required）<br> phone: 電話（Required） <br> region : 縣市（Required）<br> category : 食物種類（Required）|
| 更改餐廳資料 | PATCH | /restaurants/:name | name : 餐廳名稱（Optional）<br> phone: 電話（Optional）<br> region : 縣市（Optional）<br> category : 食物種類（Optional）|
| 刪除餐廳資料 | DELETE | /restaurants/:name | - |

