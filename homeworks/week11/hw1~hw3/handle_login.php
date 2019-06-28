<!DOCTYPE HTML>

<html>
  <head>
    <meta charset='UTF-8'>
    <title>Week11-Message Board with PHP（Cindy）</title>
    <link rel='stylesheet' href='./style.css'>
  </head>
</html>

<?php
  require_once('./conn.php');
  $username = $_POST['messageboard__login-username'];
  $password = $_POST['messageboard__login-password'];
  $sql = "SELECT users.id, users.username, users.password FROM CindyLyu_users AS users LEFT JOIN CindyLyu_certificates AS cert ON users.username = cert.username WHERE users.username='" . $username . "'";
  if (empty($username) || empty($password)) {
    setcookie('status', 'login-isempty', time() + 3600 * 24);
    header('Location: index.php');
    die('');
  }

  $result = $conn->query($sql);
 
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      if (password_verify($password, $row['password'])) {
        $randNum = rand(123456789, 99999999999999);
        $resultNum = $row['id'] . $randNum; // 避免亂數重複，故加上不會重複的 user id 值
        $selectData = "SELECT * FROM CindyLyu_certificates WHERE username='" . $row['username'] . "'";
        $select = $conn->query($selectData);
        if ($select->num_rows > 0) {
          $updateData = "UPDATE CindyLyu_certificates SET member_id='" . $resultNum . "' WHERE username='" . $row['username'] . "'";
          $result = $conn->query($updateData);
        } else {
          $addData = "INSERT INTO CindyLyu_certificates(member_id, username) VALUES (" . $resultNum . ", '" . $row['username'] . "')";
          $add = $conn->query($addData);
        }
        setcookie('member_id', $resultNum, time() + 3600 * 24);
        setcookie('status', 'login-success', time() + 3600 * 24);
        header('Location: index.php');
        die('');
      } 
    }
  }
  setcookie('status', 'login-failed', time() + 3600 * 24);
  header('Location: index.php');
?>