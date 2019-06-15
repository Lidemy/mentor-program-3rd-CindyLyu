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
      <div class='messageboard__title'>會員註冊</div>
      <div class='messageboard__warning-signup'>本站為練習用網站，因教學用途刻意忽略資安的實作，請勿使用任何真實的帳號或密碼做註冊：）</div>
      <?php
          if (isset($_COOKIE['status'])) {
          switch($_COOKIE['status']) {
            case 'sign-up-isempty':
              echo "<div class='messageboard__message-failed'>欄位都是必填唷！</div>";
              setcookie('status', '');
              break;
            case 'sign-up-username-repeat':
              echo "<div class='messageboard__message-failed'>帳號重複</div>";
              setcookie('status', '');
              break;
            }
          }
        ?>
      <form class='messageboard__memberdata' method='POST' action='./handle_sign_up.php'>
        <div><i class='fas fa-pen'></i>暱稱：<input name='messageboard__memberdata-nickname' placeholder='之後會在留言中顯示'></div>
        <div><i class='fas fa-user-alt'></i>帳號：<input name='messageboard__memberdata-username' placeholder='登入用帳號'></div>
        <div><i class='fas fa-lock'></i>密碼：<input name='messageboard__memberdata-password' placeholder='登入用密碼' type='password'></div>
        <div><input class='messageboard__memberdata-submit' type='submit' value='送出'></div>
      </form>
    </div>
  </body>
</html>