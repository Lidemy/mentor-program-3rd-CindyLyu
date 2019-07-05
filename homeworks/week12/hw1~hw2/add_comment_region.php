<?php
  // 新增留言區域
  echo   "<div class='messageboard__newpost-nicknameregion'>";
  echo     "<a class='far fa-user-circle'></a><input name='nickname' readonly='readonly' value='" . escape($row['nickname']) . "'>";
  echo   "</div>";
  echo   "<div><textarea name='content' placeholder='輸入留言內容'></textarea></div>";
  echo   "<input name='user_id' type='hidden' value='" . $row['id'] . "'>";
  echo   "<div><input class='messageboard__newpost-submit' type='submit' value='送出'></div>";
  echo "</form>";
?>