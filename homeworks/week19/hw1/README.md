## ToDoList API

Base URL：http://cindylyu.tw/todolist/api

| 說明 | Method | Path | 參數 | 範例 |
| -------- | -------- | -------- | ---- | ----|
| 獲取所有 todo | GET | /todo.php | - | /todo.php
| 獲取單一 todo | GET | /todo.php?todo_id=:id | todo_id：todo 的 ID 值 | /todo.php?todo_id=1
| 新增 todo | POST |/todo.php | todo_name：todo 名稱 | -
| 修改 todo | PATCH | /todo.php?todo_id=:id | todo_name：todo 名稱<br>complete：1（代表完成）或 0（代表未完成）| /todo.php?todo_id=1
| 刪除 todo | DELETE | /todo.php?todo_id=:id | - |/todo.php?todo_id=1
