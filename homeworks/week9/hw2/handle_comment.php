<!DOCTYPE HTML>

<html>
  <head>
    <meta charset='UTF-8'>
    <title>Week9-Message Board with PHP（Cindy）</title>
    <link rel='stylesheet' href='./style.css'>
  </head>
</html>

<?php
  require_once('./conn.php');
  $nickName = $_POST['messageboard__newpost-nicknameregion-name'];
  $content = $_POST['messageboard__newpost-content'];
  $user_id = $_POST['messageboard__newpost-userid'];
  $sql = "INSERT INTO CindyLyu_comments(user_id, nickname, content) VALUES ('$user_id', '$nickName', '$content')";
  if (empty($nickName) || empty($content)) {
    setcookie('status', 'message-empty', time()+3600*24);
    header('Location: index.php');
    die('');
  }
  if ($conn->query($sql)) {
    setcookie('status', 'comment-success', time()+3600*24);
    header('Location: index.php');
  } else {
    echo $conn->error;
  }
?>