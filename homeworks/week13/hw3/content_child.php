<?php
  // 顯示子留言
  $sub_stmt = $conn->prepare("SELECT * FROM CindyLyu_comments WHERE comment_id_at=? ORDER BY created_at ASC");
  $sub_stmt->bind_param('i', $row2['id']);
  $sub_stmt->execute();
  $sub_result = $sub_stmt->get_result();
  if ($sub_result->num_rows > 0) {
    while($row3 = $sub_result->fetch_assoc()) {
      if ($row2['nickname'] === $row3['nickname']) { // 檢查是否為原 po
        echo "<div class='messageboard__latestpost-sbucontentmessage origin " . $row3['id'] . "'>";
      } else {
        echo "<div class='messageboard__latestpost-sbucontentmessage'>";
      }
      if (isset($_SESSION['user_id']) && $row3['user_id'] == $_SESSION['user_id']) { // 遇到自己的留言時有不同的頭像 icon 及編輯刪除功能
        echo   "<div class='messageboard__latestpost-nickname'><i class='far fa-user-circle'></i>" . escape($row3['nickname']) . "<span class='messageboard__newpost-nicknameregion-time'>" . $row3['created_at'] . "</span></div>";
        echo   "<div><a href='./update_comment.php?content=" . escape($row3['content']) . "&id=" . $row3['id'] . "' class='messageboard__latestpost-edit title='編輯留言'><i class='far fa-edit'></i></a></div>";
        echo   "<form>";
        echo     "<input name='id'  class='hidden' value='" . $row3['id'] . "'></input>";
        echo     "<div><input class='messageboard__latestpost-childdelete self" . $row3['id'] . "'' title='刪除留言'><i class='far fa-trash-alt'></i></input></div>";
        echo   "</form>";
        echo   "<div class='messageboard__latestpost-content self" . $row3['id'] . "'>" . escape($row3['content']) . "</div>";
        echo   "<div class='messageboard__latestpost-id self hidden'>" . $row3['id'] . "</div>";
      } else {
        echo   "<div class='messageboard__latestpost-nickname'><i class='fas fa-user-circle'></i>" . escape($row3['nickname']) . "<span class='messageboard__newpost-nicknameregion-time'>" . $row3['created_at'] . "</span></div>";
        echo   "<div class='messageboard__latestpost-content'>" . escape($row3['content']) . "</div>";
      }
      echo "</div>";
    }
  }
  // 子留言新增區域
  if (isset($_SESSION['user_id'])) { // 驗證是否為登入者
    echo   "<form class='messageboard__latestpost-subnewpost " . $row2['id'] . "'>";
    echo     "<input name='comment_id_at' class='comment_id_at". $row2['id'] . " hidden' value='" . $row2['id'] . "'>";
    include('./add_comment_region.php');
  }
?>
