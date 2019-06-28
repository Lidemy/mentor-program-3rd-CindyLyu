<?php
  require_once('./conn.php');
  setCookie('member_id', '');
  header('Location: index.php');
?>