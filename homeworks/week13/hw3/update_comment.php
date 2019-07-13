<!DOCTYPE HTML>

<html>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Week13-Message Board with PHP（Cindy）</title>
    <link rel='stylesheet' href='./style.css'>
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css' integrity='sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay' crossorigin='anonymous'>
  </head>
  <body>
    <div class='messageboard__update'>
      <div class='messageboard__title'>編輯留言</div>
      <?php
        include_once('./utils.php');
        if (isset($_COOKIE['status'])) {
          switch($_COOKIE['status']) {
            case 'message-empty':
              $message = new message('沒有填寫到內容喔！', 'failed');
              break;
          }
        }
      ?>
      <form class='messageboard__editarea' method='POST' action='./handle_update_comment.php'>
        <textarea class='messageboard__editarea-content' name='content' required><?php echo $_GET['content']; ?></textarea>
        <input class='hidden' name='comment_id' value='<?php echo $_GET['id']; ?>'></input>
        <div><input class='messageboard__memberdata-submit' type='submit' value='送出'></div>
      </form>
    </div>
  </body>
</html>