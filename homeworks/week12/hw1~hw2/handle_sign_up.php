<?php
  require_once('./conn.php');
  include_once('./utils.php');
  $nickname = $_POST['signup_nickname'];
  $username = $_POST['signup_username'];
  $password = password_hash($_POST['signup_password'], PASSWORD_DEFAULT);

  $stmt = $conn->prepare("INSERT INTO CindyLyu_users(nickname, username, password) VALUES (?, ?, ?)");
  $stmt->bind_param('sss', $nickname, $username, $password);

  if (empty($nickname) || empty($username) || empty($password)) {
    $redirect = new redirect('sign-up-isempty', 'Location: sign_up.php');
    die('');
  }
  
  if ($stmt->execute()) {
    $redirect = new redirect('sign-up-complete', 'Location: index.php');
  } else if ($stmt->error === "Duplicate entry '" . $username . "' for key 'username'") { // 如果帳號和暱稱均重複時，只顯示帳號重複，待想想優化方式
    $redirect = new redirect('sign-up-username-repeat', 'Location: sign_up.php');
  } else if ($stmt->error === "Duplicate entry '" . $nickname . "' for key 'nickname'") {
    $redirect = new redirect('sign-up-nickname-repeat', 'Location: sign_up.php');
  } else {
    echo $stmt->error;
  }
?>