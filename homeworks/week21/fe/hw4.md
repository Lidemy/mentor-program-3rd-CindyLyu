## 為什麼我們需要 React？可以不用嗎？
可以不使用到 React，網站功能較單純時其實可以直接使用 jQuery 或是原生的 JavaScript 來寫即可，我們會需要使用 React 的原因為當網站功能一多，使用 React 可以幫助我們將不同的地方做成一個個 component，並且可重複使用，當要更改時直接修改該 component 就可以一併更改到使用過這個 component 的內容，而不需要去找哪裡有使用到這個功能來一個一個做修改，而我們也可以專注在修改 state 就可以連動畫面中元素的顯示，也不用擔心重新 render 會造成效能過度耗損的問題，因為 React 有 virtual DOM 的機制。

## React 的思考模式跟以前的思考模式有什麼不一樣？
在寫 React 時的思考模式為更改 state 就可以更改畫面的元素；以前的話會需要去顧慮畫面的元素變動甚至也需要顧慮資料的狀態是否一致。

## state 跟 props 的差別在哪裡？
- state 為每個 component 都可能有的內容，也就是該 component 的狀態，並且可透過該 component 來做修改
- props 為別人傳進來的東西，例如需要更改其他 component 的 state 就可以使用 props 來傳遞。

## 請列出 React 的 lifecycle 以及其代表的意義
- ```constructor``` ：初始化該 component，並且將預設的 ```state``` 寫進 ```constructor``` 裡面，需注意在使用 ```constructor``` 及 ```super``` 時都要填入參數 ```prpos``` 會比較好，避免之後使用 ```this.props``` 發生未知的錯誤
- ```shouldComponentUpdate```：依據回傳為 true 或 false 來告知是否有需要 call component  render，此函式裡面可填入兩個參數，分別是 ```nextProps``` 和 ```nextState```
- ```componentDidMount```：Mount 指的是當 render 到畫面上這個動作，所以執行此函式時代表已經經過 component 的 constructor 以及 render，才會執行此
- ```componentWillUnmount```：通常與上面提到的 ```componentDidMount``` 一起出現，當 component 被取消 render 時，如果已使用 ```componentDidMount``` 就會一起搭配 ```componentWillUnmount``` 來取消 ```componentDidMount``` 的內容，否則會因為要執行 ```componentDidMount``` 而沒有依據的 component（因為取消 render 了），而產生 error

## Reference
- [[FE301] React 基礎](https://www.lidemy.com/courses/enrolled/390626)
- [React.js 小书](http://huziketang.mangojuice.top/books/react/)
