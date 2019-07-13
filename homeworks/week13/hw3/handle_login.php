<?php
  require_once('./conn.php');
  include_once('./utils.php');
  $username = $_POST['username'];
  $password = $_POST['password'];
  $stmt = $conn->prepare("SELECT * FROM CindyLyu_users WHERE username=?");
  $stmt->bind_param('s', $username);
  $stmt->execute();

  $result = $stmt->get_result();
  
  if (empty($username) || empty($password)) {
    $redirect = new redirect('login-isempty', 'Location: index.php');
    die('');
  }

  if ($result->num_rows > 0) {
     while($row = $result->fetch_assoc()) {
      if (password_verify($password, $row['password'])) {
        session_start();
        $_SESSION['username'] = $row['username'];
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['nickname'] = $row['nickname'];
        $redirect = new redirect('login-success', 'Location: index.php');
        die('');
      } 
    }
  }
  $redirect = new redirect('login-failed', 'Location: index.php');
?>