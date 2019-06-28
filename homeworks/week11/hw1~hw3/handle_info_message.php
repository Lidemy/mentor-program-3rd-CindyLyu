<?php
  class message {
    public function __construct($message, $result) {
      if ($result === 'success') {
        echo "<div class='messageboard__message-success'>" . $message . "</div>";
      } else {
        echo "<div class='messageboard__message-failed'>" .$message . "</div>";
      }
      setcookie('status', '');
    }
  }
?>
