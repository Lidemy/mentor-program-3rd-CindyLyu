<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $comment_id_at = $_POST['comment_id_at'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];
  $id = $_POST['id'];

  if (empty($content)) {
    $redirect = new redirect('message-empty', 'Location: index.php');
    die('');
  }

  $stmt = $conn->prepare("INSERT into CindyLyu_comments(comment_id_at, user_id, nickname, content, id) 
          VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param("sisss", $comment_id_at, $_SESSION['user_id'], $nickname, $content, $id);

  if (!($stmt->execute())) {
    echo $conn->error;
  }
?>