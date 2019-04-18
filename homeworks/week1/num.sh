#!/bin/bash
#宣告檔案內的語法是使用 bash，未使用的話可能會造成系統無法判斷

for((i=1;i<=$1;i++))
do
  touch $((${a}+${i})).js
done

echo $1 個檔案建立完成！



#chmod +x 改變檔案權限為可執行
#chmod = change mode	
