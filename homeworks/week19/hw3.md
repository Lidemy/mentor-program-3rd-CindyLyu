## 請簡單解釋什麼是 Single Page Application
指的是單頁式應用，像是第八週 [hw1](https://lidemy.github.io/mentor-program-3rd-CindyLyu/homeworks/week8/hw1/) 幫王媽媽做的抽獎頁面及本週作業的 Todo list，頁面上經過操作後結果都還是會顯示在同一頁且同一個網址。

## SPA 的優缺點為何
優點
- 使用者體驗較佳，因為都在同一頁，不會有換頁的效果
- 前後端劃分清楚，不再因為前/後端其一壞掉而影響另一方


缺點
- 因為所有操作都在同一頁上，所以該頁面的程式碼會較複雜甚至雜亂，需要花更多心思去寫
- SEO 變差，因為內容都是 JavaScript 動態生成上去，除非第一頁使用 SSR（Server Side Rendering），就需要結合一些後端（Server Side）的技術才能做到


## Reference
- [跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9)
