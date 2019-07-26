<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');

  $nickname = $_SESSION['nickname'];
  $content = $_POST['content'];
  $user_id = $_SESSION['user_id'];
  
  $stmt = $conn->prepare("INSERT INTO CindyLyu_comments(user_id, nickname, content) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $user_id, $nickname, $content);
  
  if (!($stmt->execute())) {
    echo $conn->error;
  } else {
    $comment_id = $stmt->insert_id;
    $stmt2 = $conn->prepare("SELECT * FROM CindyLyu_comments WHERE id=?");
    $stmt2->bind_param("i", $comment_id);
    $stmt2->execute();
    $result = $stmt2->get_result();
    $row = $result->fetch_assoc();
    echo json_encode($row, JSON_UNESCAPED_UNICODE);
  }
?>
