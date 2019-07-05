<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $id = $_POST['id'];

  $sql = "DELETE FROM CindyLyu_comments WHERE id=" . $id . " AND user_id=" . $_SESSION['user_id']; // 刪除主要留言
  $sql2 = "DELETE FROM CindyLyu_comments WHERE comment_id_at=$id"; // 刪除子留言

  if ($conn->query($sql)) { // 主留言
    if ($conn->query($sql2)) { // 子留言 
      $redirect = new redirect('comment-delete-success', 'Location: index.php');
      exit();
    }
    $redirect = new redirect('comment-delete-success', 'Location: index.php');
  } else {
    echo $conn->error;
  }
?>