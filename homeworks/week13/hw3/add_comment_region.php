<?php
  // 新增留言區域
  echo   "<div class='messageboard__newpost-nicknameregion'>";
  echo     "<a class='far fa-user-circle'></a><input name='nickname' readonly='readonly' value='" . escape($row['nickname']) . "'>";
  echo   "</div>";
  if (isset($row2['id'])) {
    echo   "<div><textarea class='messageboard__newpost-content" . $row2['id'] . "' name='content' placeholder='輸入留言內容'></textarea></div>"; // 子留言
  } else {
    echo   "<div><textarea class='messageboard__newpost-content' name='content' placeholder='輸入留言內容'></textarea></div>"; // 主留言
  }
  echo   "<input name='user_id' type='hidden' value='" . $row['id'] . "'>";
  echo   "<div><input class='messageboard__newpost-submit' readonly='readonly' value='送出'></div>";
  echo "</form>";
?>