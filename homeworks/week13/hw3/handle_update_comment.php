<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $content = $_POST['content'];
  $id = $_POST['comment_id'];
  
  $stmt = $conn->prepare("UPDATE CindyLyu_comments SET content=? WHERE id=? AND user_id=?");
  $stmt->bind_param("sii", $content, $id, $_SESSION['user_id']);
  
  if ($stmt->execute()) {
    $redirect = new redirect('update-success', 'Location: index.php');
    die();
  } else {
    echo $conn->error;
  }
?>