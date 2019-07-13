<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $id = $_POST['id'];

  $stmt = $conn->prepare("DELETE FROM CindyLyu_comments WHERE id=? AND user_id=?"); // 主留言
  $stmt2 = $conn->prepare("DELETE FROM CindyLyu_comments WHERE comment_id_at=?"); // 子留言
  $stmt->bind_param('ii', $id, $_SESSION['user_id']);
  $stmt2->bind_param('i', $id);

  $stmt->execute();
  $stmt2->execute();
?>