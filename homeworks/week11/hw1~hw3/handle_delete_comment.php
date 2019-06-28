<?php
  require_once('./conn.php');
  $id = $_GET['id'];
  $sql = "DELETE FROM CindyLyu_comments WHERE id=$id";
  $result = $conn->query($sql);
  if ($conn->query($sql)) {
    setcookie('status', 'comment-delete-success', time() + 3600 * 24);
    header('Location: index.php');
  } else {
    echo $conn->error;
  }
?>