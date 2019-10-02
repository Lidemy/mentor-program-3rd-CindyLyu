## 為什麼我們需要 Redux？
![](https://user-images.githubusercontent.com/48987435/65849869-ecd0c480-e37e-11e9-8d10-fab8ba16c833.png)
如圖，當較深的 component 層級像是 E component 需要傳東西給 B component 時，就需要 E 先將東西往上傳至 root 再往下傳至 B，這樣會很麻煩，所以有了 Redux 的 Global state 一個公共的 state 及相關概念來解決此問題。


## Redux 是什麼？
Redux 不一定要跟 React 一起使用，可以將 Redux 當作是一個模式，Redux 是提供一個 global state，讓各 component 可以用一些方式取到 state 來使用，甚至去修改 global 的 state，就無需透過冗長層級的方式來傳遞。

#### 實際的使用方式
global state 在 Redux 稱作 store，透過 ```createStore``` 及自己寫的 reducer 來建立一個 store，並用 ```connect``` 讓 Redux 與 component 來連接，當要取用 store 時，就可以使用 ```mapStateToProps``` 來使用 store 裡面的 state，或是要修改 state 時就可以使用 ```mapDispatchToProps``` 來修改，在使用 connect 時，如果有使用到參數 ```mapStateToProps``` 也就會等同於 subscribe store，當 store 有更新時就會一併更新這些 component 使用到的 store 內容。

其中又因為 reducer 中會使用到 action type，因為會有打錯字的時候，所以將 action type 改變成變數，當打錯變數時就會有錯誤訊息而得知打錯，就不會 debug 老半天。

在 dispatch 中常常會用到固定的 type 及要改的內容，所以將 type 及要改的內容包成 function，並宣告成變數使用，這些變數又稱作 action creator。


## Single Page Application 是什麼？有哪些頁面一定要用這個架構去設計嗎？
Single Page Application 簡稱 SPA，是單頁式應用，無論要顯示什麼或是點擊任何連結後都在同一頁顯示，總之就是不會像以前有換頁出現白頁面的情況。
有哪些頁面一定會使用到 SPA，像是播放音樂的網站，如果用以往的設計會換頁，就會讓音樂暫停，這樣使用體驗就不太好。


<<<<<<< HEAD
## Reference
- 程式導師實驗計畫第二期：Week14-1 Redux
- 程式導師實驗計畫：Lesson 13-1 之 React + Redux
- [Redux-Common ways of calling ```connect```](https://react-redux.js.org/introduction/basic-tutorial#common-ways-of-calling-connect)
=======
>>>>>>> 3f956f0310b8835f5bea977b6cf7f599a25bd823
