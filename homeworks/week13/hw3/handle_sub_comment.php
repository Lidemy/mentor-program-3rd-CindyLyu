<?php
  session_start();
  require_once('./conn.php');
  include_once('./utils.php');
  $comment_id_at = $_POST['comment_id_at'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];

  if (empty($content)) {
    $redirect = new redirect('message-empty', 'Location: index.php');
    die('');
  }

  $stmt = $conn->prepare("INSERT into CindyLyu_comments(comment_id_at, user_id, nickname, content) 
          VALUES (?, ?, ?, ?)");
  $stmt->bind_param("siss", $comment_id_at, $_SESSION['user_id'], $nickname, $content);

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