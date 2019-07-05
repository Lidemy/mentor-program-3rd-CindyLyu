<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $id = $_POST['id'];

  $sql = "DELETE FROM CindyLyu_comments WHERE id=" . $id . " AND user_id=" . $_SESSION['user_id'];

  if ($conn->query($sql)) {
    $redirect = new redirect('comment-delete-success', 'Location: index.php');
  } else {
    echo $conn->error;
  }
?>