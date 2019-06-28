<?php
  require_once('./conn.php');
  $content = $_POST['content'];
  $id = $_POST['comment_id'];
  $sql = "UPDATE CindyLyu_comments SET content='" . $content . "' WHERE id=" . $id;
  $result = $conn->query($sql);
  if ($conn->query($sql)) {
    setcookie('status', 'update-success', time() + 3600 * 24);
    header('Location: index.php');
  } else {
    echo $conn->error;
  }
?>