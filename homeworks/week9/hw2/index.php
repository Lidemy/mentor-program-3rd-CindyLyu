<!DOCTYPE HTML>

<html>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Week9-Message Board with PHP（Cindy）</title>
    <link rel='stylesheet' href='./style.css'>
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css' integrity='sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay' crossorigin='anonymous'>
  </head>
  <body>
    <div class='messageboard'>
      <?php
        if(!isset($_COOKIE['member_id'])) {
          echo "<div class='messageboard__warning'>本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼：）</div>";
        } else {
          echo "<div class='test'></div>";
          echo "<div><a class='messageboard__signout' href='./handle_sign_out.php'>登出</a></div>";
        }
      ?>
      <div class='messageboard__title'>PHP 留言板<i class='far fa-comment-alt'></i></div>
      <?php
        // 顯示提示訊息
        if (isset($_COOKIE['status'])) {
          switch($_COOKIE['status']) {
            case 'login-success':
              echo "<div class='messageboard__message-success'>登入成功</div>";
              setcookie('status', '');
              break;
            case 'login-isempty':
              echo "<div class='messageboard__message-failed'>帳號密碼都要填寫喔</div>";
              setcookie('status', '');
              break;
            case 'login-failed':
              echo "<div class='messageboard__message-failed'>帳號或密碼錯誤</div>";
              setcookie('status', '');
              break;
            case 'message-empty':
              echo "<div class='messageboard__message-failed'>沒有填寫到內容唷！</div>";
              setcookie('status', '');
              break;
            case 'comment-success':
              echo "<div class='messageboard__message-success'>留言成功</div>";
              setcookie('status', '');
              break;
          }
        }
      ?>
      <?php
        if (!isset($_COOKIE['member_id'])) {
          $status = 'sign-out';
          // 還沒登入時顯示提示登入或註冊訊息
          echo "<div class='messageboard__memberregion'>";
          echo   "<form class='messageboard__login' method='POST' action='./handle_login.php'>";
          echo   "<div class='messageboard__membermessage-login'>登入後就可以留言囉！</div>";
          echo   "<div><input name='messageboard__login-username' placeholder='輸入你的帳號'></div>";
          echo   "<div><input name='messageboard__login-password' type='password' placeholder='輸入密碼'></div>";
          echo   "<div><input name='messageboard__login-submit' type='submit' value='登入'></div>";
          echo   "</form>";
          echo   "<div class='messageboard__membermessage-signup'>還沒有帳戶嗎？<a id='go_to_sign_up' href='./sign_up.php'> 前往註冊</a></div>";
          echo "</div>";
        } else {
          $status = 'login';
          // 已登入時顯示留言區域
          require_once('./conn.php');
          $sql = "SELECT * FROM CindyLyu_users WHERE id='" . $_COOKIE['member_id'] ."'";
          $result = $conn->query($sql);
          $row = $result->fetch_assoc();
          echo "<form class='messageboard__newpost' method='POST' action='./handle_comment.php'>";
          echo   "<div class='messageboard__newpost-nicknameregion'>";
          echo     "<a class='far fa-user-circle'></a><input name='messageboard__newpost-nicknameregion-name'  readonly='readonly' value='" . $row['nickname'] . "'>";
          echo   "</div>";
          echo   "<div><textarea name='messageboard__newpost-content' placeholder='輸入留言內容'></textarea></div>";
          echo   "<input name='messageboard__newpost-userid' type='hidden' value='" . $row['id'] . "'>";
          echo   "<div><input class='messageboard__newpost-submit' type='submit' value='送出'></div>";
          echo "</form>";
        }
      ?>
      <hr class='messageboard__line'>
      <div class='messageboard__latestpost-title'>最新留言</div>
      <?php
      // 顯示最新留言
        require_once('./conn.php');
        $sql = 'SELECT * FROM CindyLyu_comments ORDER BY created_at DESC LIMIT 50';
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
            if ($status === 'login') {
                // 如果是登入者就顯示不同 icon
              if ($row['user_id'] === $_COOKIE['member_id']) {
                echo "<div class='messageboard__latestpost'>";
                echo  "<div class='messageboard__latestpost-nickname'><i class='far fa-user-circle'></i>" . $row['nickname'] . "<span class='messageboard__newpost-nicknameregion-time'>" . $row['created_at'] . "</span></div>";
                include("content.php");
              } else {
                echo "<div class='messageboard__latestpost'>";
                echo  "<div class='messageboard__latestpost-nickname'><i class='fas fa-user-circle'></i>" . $row['nickname'] . "<span class='messageboard__newpost-nicknameregion-time'>" . $row['created_at'] . "</span></div>";
                include("content.php");
              }
            } else {
              echo "<div class='messageboard__latestpost'>";
              echo  "<div class='messageboard__latestpost-nickname'><i class='fas fa-user-circle'></i>" . $row['nickname'] . "<span class='messageboard__newpost-nicknameregion-time'>" . $row['created_at'] . "</span></div>";
              include("content.php");
            }
          }
        }
      ?>
    </div>
  </body>
</html>