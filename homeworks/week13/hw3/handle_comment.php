<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');

  $nickname = $_SESSION['nickname'];
  $content = $_POST['content'];
  $user_id = $_SESSION['user_id'];
  $id = $_POST['id'];
  
  $stmt = $conn->prepare("INSERT INTO CindyLyu_comments(user_id, nickname, content, id) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("sssi", $user_id, $nickname, $content, $id);
  
  if (!($stmt->execute())) {
    echo $conn->error;
  } 
?>
