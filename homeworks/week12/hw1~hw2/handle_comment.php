<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];
  $user_id = $_POST['user_id'];
  
  if ($user_id == $_SESSION['user_id'] && $nickname = $_SESSION['nickname']) { // 確保 id 及 nickname 都沒有在 client 被改過
    $stmt = $conn->prepare("INSERT INTO CindyLyu_comments(user_id, nickname, content) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $user_id, $nickname, $content);

    if (empty($nickname) || empty($content)) {
      $redirect = new redirect('message-empty', 'Location: index.php');
      die('');
    }

    if ($stmt->execute()) {
      $redirect = new redirect('comment-success', 'Location: index.php');
    } else {
      echo $conn->error;
    }
  }
    
?>
