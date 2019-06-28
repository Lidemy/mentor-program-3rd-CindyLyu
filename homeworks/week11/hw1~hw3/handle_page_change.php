<?php
  require_once('./conn.php');
  $page = $_GET['page'];
  setcookie('page', $page, time() + 3600 * 24);
  header('Location: index.php');
?>

