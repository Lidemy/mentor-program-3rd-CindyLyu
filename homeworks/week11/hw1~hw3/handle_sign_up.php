<?php
  require_once('./conn.php');
  $nickname = $_POST['messageboard__memberdata-nickname'];
  $username = $_POST['messageboard__memberdata-username'];
  $password = password_hash($_POST['messageboard__memberdata-password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO CindyLyu_users(nickname, username, password) VALUES ('$nickname', '$username', '$password')";
  if (empty($nickname) || empty($username) || empty($password)) {
    setcookie('status', 'sign-up-isempty', time() + 3600 * 24);
    header('Location: sign_up.php');
    die('');
  }
  if ($conn->query($sql)) {
    setcookie('status', 'sign-up-complete', time() + 3600 * 24);
    header('Location: index.php');
  } else {
    setcookie('status', 'sign-up-username-repeat', time() + 3600 * 24);
    header('Location: sign_up.php');
  }
?>