<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $comment_id_at = $_POST['comment_id_at'];
  $user_id = $_POST['user_id'];
  $user_nickname = $_POST['nickname'];
  $content = $_POST['content'];

  if (empty($content)) {
    $redirect = new redirect('message-empty', 'Location: index.php');
    die('');
  }

  if ($user_id == $_SESSION['user_id']) {
    $sql = "INSERT into CindyLyu_comments(comment_id_at, user_id, nickname, content) 
            VALUES ($comment_id_at, $user_id, '$user_nickname', '$content')";
    if ($conn->query($sql)) {
      $redirect = new redirect('comment-success', 'Location: index.php');
    } else {
      echo $conn->error;
    }
  }
    
?>