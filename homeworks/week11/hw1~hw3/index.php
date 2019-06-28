<!DOCTYPE HTML>

<html>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Week11-Message Board with PHP（Cindy）</title>
    <link rel='stylesheet' href='./style.css'>
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css' integrity='sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay' crossorigin='anonymous'>
  </head>
  <body>
    <div class='messageboard'>
      <?php
        if(!isset($_COOKIE['member_id'])) {
          echo "<div class='messageboard__warning'>本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼：）</div>";
        } else {
          echo "<div><a class='messageboard__signout' href='./handle_sign_out.php'>登出</a></div>";
        }
      ?>
      <div class='messageboard__title'>PHP 留言板<i class='far fa-comment-alt'></i></div>
      <?php
        // 顯示提示訊息
        include('./handle_info_message.php');
        if (isset($_COOKIE['status'])) {
          switch($_COOKIE['status']) {
            case 'sign-up-complete':
              $message = new message('帳戶新增成功，可於下方做登入', 'success');
              break;
            case 'login-success':
              $message = new message('登入成功', 'success');
              break;
            case 'login-isempty':
              $message = new message('帳號密碼都要填寫喔！', 'failed');
              break;
            case 'login-failed':
              $message = new message('帳號或密碼錯誤', 'failed');
              break;
            case 'message-empty':
              $message = new message('沒有填寫到內容喔！', 'failed');
              break;
            case 'comment-success':
              $message = new message('留言成功', 'success');
              break;
            case 'comment-delete-success':
              $message = new message('刪除成功', 'success');
              break;
            case 'update-success';
              $message = new message('更新成功', 'success');
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
          $sql = "SELECT cert.username, users.username, users.nickname, users.id 
                  FROM CindyLyu_certificates AS cert 
                  LEFT JOIN CindyLyu_users AS users ON cert.username = users.username 
                  WHERE cert.member_id='" . $_COOKIE['member_id'] ."'";
          $result = $conn->query($sql);
          $row = $result->fetch_assoc();
          echo "<form class='messageboard__newpost' method='POST' action='./handle_comment.php'>";
          echo   "<div class='messageboard__newpost-nicknameregion'>";
          echo     "<a class='far fa-user-circle'></a><input name='messageboard__newpost-nicknameregion-name' readonly='readonly' value='" . $row['nickname'] . "'>";
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
        $limit = 20;
        $offset = 0;
        if (isset($_COOKIE['page'])) {
          $clickPage = $_COOKIE['page'];
          if ($clickPage) {
            $offset = $offset + 20 * ($clickPage - 1);
          }
        }  
        $sql = "SELECT cert.member_id, cert.username, users.username, users.nickname, comments.id, comments.content, comments.nickname, comments.created_at
                FROM CindyLyu_comments as comments
                LEFT JOIN CindyLyu_users as users ON comments.nickname = users.nickname
                LEFT JOIN CindyLyu_certificates as cert ON users.username = cert.username
                ORDER BY created_at DESC LIMIT " . $limit . " OFFSET " . $offset;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
            if ($status === 'login') {
              if ($row['member_id'] === $_COOKIE['member_id']) {
                // 如果是登入者就顯示不同 icon 及編輯、刪除功能
                echo "<div class='messageboard__latestpost'>";
                echo   "<div class='messageboard__latestpost-nickname'><i class='far fa-user-circle'></i>" . $row['nickname'] . "<span class='messageboard__newpost-nicknameregion-time'>" . $row['created_at'] . "</span></div>";
                echo   "<div><a class='messageboard__latestpost-edit title='編輯留言'><i class='far fa-edit'></i></a></div>";
                echo   "<div><a href='./handle_delete_comment.php?id=" . $row['id'] . "' class='messageboard__latestpost-delete self" . $row['id'] . "'' title='刪除留言'><i class='far fa-trash-alt'></i></a></div>";
                echo   "<div class='messageboard__latestpost-content self" . $row['id'] . "'>" . $row['content'] . "</div>";
                echo   "<div class='messageboard__latestpost-id self hidden'>" . $row['id'] . "</div>";
                echo "</div>";
              } else {
                echo "<div class='messageboard__latestpost'>";
                echo   "<div class='messageboard__latestpost-nickname'><i class='fas fa-user-circle'></i>" . $row['nickname'] . "<span class='messageboard__newpost-nicknameregion-time'>" . $row['created_at'] . "</span></div>";
                include("content.php");
              }
            } else {
              echo "<div class='messageboard__latestpost'>";
              echo   "<div class='messageboard__latestpost-nickname'><i class='fas fa-user-circle'></i>" . $row['nickname'] . "<span class='messageboard__newpost-nicknameregion-time'>" . $row['created_at'] . "</span></div>";
              include("content.php");
            }
          }
        }
      ?>
      <div class='messageboard__page'>
        <?php
          $pageSql = "SELECT * FROM CindyLyu_comments";
          $page = $conn->query($pageSql);
          $pageNum = ceil($page->num_rows / 20);
          for ($i = 1; $i <= $pageNum; $i += 1) {
            echo "<a href='./handle_page_change.php?page=". $i . "' class='messageboard__page-child' id='" . $i . "'>" . $i . "</a>";
          }
        ?>
      </div>
    </div>
    <script src='./handle_update_comment.js'></script>
    <script src='./handle_page_change.js'></script>
  </body>
</html>