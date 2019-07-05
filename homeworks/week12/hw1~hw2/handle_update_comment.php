<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $content = $_POST['content'];
  $id = $_POST['comment_id'];
  $sql = "UPDATE CindyLyu_comments SET content='" . $content . "' WHERE id=" . $id . " AND user_id=" . $_SESSION['user_id'];
  $result = $conn->query($sql);
  if ($conn->query($sql)) {
    $redirect = new redirect('update-success', 'Location: index.php');
  } else {
    echo $conn->error;
  }
?>