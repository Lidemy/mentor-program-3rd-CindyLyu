## 交作業流程
1. 切換資料夾
    > 在 iTerm2 上輸入指令 `cd` 切換到資料夾（mentor-program-3rd-CindyLyu）

2. 新增 branch
    > 輸入指令 `git branch HW1`

3. 切換 branch
    > 輸入指令 `git checkout HW1`

4. 開始寫作業並在 commit 前檢查
    > 

5. 作業完成後執行 commit
    > 輸入指令 ``git commit -am'HW1'``（同時 eslint 也會進行檢查 JavaScript 的程式碼，如果有錯誤會顯示哪個檔案有問題）

6. 檢查是否通過 eslint 及 commit 成功
    > 檢查 commit 可輸入指令 `git status`

7. push 到 GitHub 上
    > 輸入指令 ```git push origin HW1```

8. 執行 Pull requests
    > 到 GitHub 上執行 Pull requests，將 branch 中的 HW1 合併到 master 上（並輸入標題及內文，內文可輸入心得或問題）

9. 新增 Issues
    > 在 [交作業專區](https://github.com/Lidemy/homeworks-3rd/issues
) 新增一則 Issues，標題一定要輸入 [Week1] 首字大寫，內文附上 Pull requests 完成後的網址，也可附上心得及問題。

10. 更新本地端檔案 Pull（master）下來
    > 當 Huli 審核過功課後會將之前新增的 issues close ，就可將程式碼更新執行 Pull，輸入指令 ```git pull origin master``` ，並且輸入 ```
git branch -d HW1``` 把原本 HW1 的 branch 刪除


    註：無論之後要修改作業或是新增作業都需要新開一個 branch