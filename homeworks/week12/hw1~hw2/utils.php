<?php
  class message {
    public function __construct($message, $result) {
      $this->message = $message;
      $this->result = $result;
      $this->content();
    }

    private function content() {
      if ($this->result === 'success') {
        echo "<div class='messageboard__message-success'>" . $this->message . "</div>";
      } else {
        echo "<div class='messageboard__message-failed'>" . $this->message . "</div>";
      }
      setcookie('status', '');
    } 
  }


  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
  }


  class redirect {
    public function __construct($content, $url) {
      $this->content = $content;
      $this->url = $url;
      $this->setCookie();
      $this->redirect();
    }

    private function setCookie() {
      setcookie('status', $this->content, time() + 3600 * 24);
    }

    private function redirect() {
      header($this->url);
    }
  }
?>
