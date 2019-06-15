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
  $username = $_POST['messageboard__login-username'];
  $password = $_POST['messageboard__login-password'];
  $sql = "SELECT * FROM  CindyLyu_users WHERE username='" . $username . "'and password='" . $password . "'";
  if (empty($username) || empty($password)) {
    setcookie('status', 'login-isempty', time()+3600*24);
    header('Location: index.php');
    die('');
  }
  
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      setcookie('member_nickname', $row['nickname'], time()+3600*24);
      setcookie('member_id', $row['id'], time()+3600*24);
      setcookie('status', 'login-success', time()+3600*24);
      header('Location: index.php');
      die('');
    }
  }
  setcookie('status', 'login-failed', time()+3600*24);
  header('Location: index.php');
?>