<!DOCTYPE HTML>

<html>
  <head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Week13-Message Board with PHP（Cindy）</title>
    <link rel='stylesheet' href='./style.css'>
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css' integrity='sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay' crossorigin='anonymous'>
    <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
  </head>
  <body>
    <div class='messageboard'>
      <?php
        session_start();
        if(!isset($_SESSION['username'])) {
          echo "<div class='messageboard__warning'>本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼：）</div>";
        } else {
          echo "<div><a class='messageboard__signout' href='./handle_sign_out.php'>登出</a></div>";
        }
      ?>
      <div class='messageboard__title'>PHP 留言板<i class='far fa-comment-alt'></i></div>
      <?php
        // 顯示提示訊息
        include_once('./utils.php');
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
        if (!isset($_SESSION['username'])) {
          $status = 'sign-out';
          // 還沒登入時顯示提示登入或註冊訊息
          echo "<div class='messageboard__memberregion'>";
          echo   "<form class='messageboard__login' method='POST' action='./handle_login.php'>";
          echo     "<div class='messageboard__membermessage-login'>登入後就可以留言囉！</div>";
          echo     "<div><input name='username' placeholder='輸入你的帳號'></div>";
          echo     "<div><input name='password' type='password' placeholder='輸入密碼'></div>";
          echo     "<div><input name='submit' type='submit' value='登入'></div>";
          echo   "</form>";
          echo   "<div class='messageboard__membermessage-signup'>還沒有帳戶嗎？<a id='go_to_sign_up' href='./sign_up.php'> 前往註冊</a></div>";
          echo "</div>";
        } else {
          $status = 'login';
          // 已登入時顯示留言區域
          require_once('./conn.php');
          $sql = "SELECT * FROM CindyLyu_users WHERE id=" . $_SESSION['user_id'];
          $result = $conn->query($sql);
          $row = $result->fetch_assoc();
          echo "<form class='messageboard__newpost'>";
          include('./add_comment_region.php');
        }
      ?>
      <hr class='messageboard__line'>
      <div class='messageboard__latestpost-title'>最新留言</div>
      <div class='messageboard__latestpost-region'>
      <?php
        // 顯示最新留言
        require_once('./conn.php');
        $limit = 20;
        $offset = 0;

        if (isset($_GET['page'])) {
          $offset = $offset + 20 * ($_GET['page'] - 1);
        }

        $stmt = $conn->prepare("SELECT users.username, users.nickname, comments.user_id, comments.id, comments.content, comments.nickname, comments.created_at
                FROM CindyLyu_comments as comments
                LEFT JOIN CindyLyu_users as users ON comments.user_id = users.id
                WHERE comment_id_at=0
                ORDER BY created_at DESC LIMIT ? OFFSET ?");
        $stmt->bind_param("ii", $limit, $offset);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
          while($row2 = $result->fetch_assoc()) {
            echo "<div class='messageboard__latestpost " . $row2['user_id'] . "'>";
            if ($status === 'login' && $row2['user_id'] == $_SESSION['user_id']) {
            // 如果是登入者就顯示不同 icon 及有編輯、刪除功能
              echo   "<div class='messageboard__latestpost-nickname'><i class='far fa-user-circle'></i>" . escape($row2['nickname']) . "<span class='messageboard__newpost-nicknameregion-time'>" . $row2['created_at'] . "</span></div>";
              echo   "<div><a href='./update_comment.php?content=" . escape($row2['content']) . "&id=" . $row2['id'] . "' class='messageboard__latestpost-edit title='編輯留言'><i class='far fa-edit'></i></a></div>";
              echo   "<form>";
              echo     "<input name='id'  class='hidden' value='" . $row2['id'] . "'></input>";
              echo     "<div><input class='messageboard__latestpost-delete self" . $row2['id'] . "' title='刪除留言'><i class='far fa-trash-alt'></i></input></div>";
              echo   "</form>";
              echo   "<div class='messageboard__latestpost-content self" . $row2['id'] . "'>" . escape($row2['content']) . "</div>";
              echo   "<div class='messageboard__latestpost-id self hidden'>" . $row2['id'] . "</div>";
              echo   "<div class='childcontent" . $row2['id'] . "'></div>";
            } else {
              echo   "<div class='messageboard__latestpost-nickname'><i class='fas fa-user-circle'></i>" . escape($row2['nickname']) . "<span class='messageboard__newpost-nicknameregion-time'>" . $row2['created_at'] . "</span></div>";
              echo   "<div class='messageboard__latestpost-content'>" . escape($row2['content']) . "</div>";
              echo   "<div class='messageboard__latestpost-id hidden'>" . $row2['id'] . "</div>";
              echo   "<div class='childcontent" . $row2['id'] . "'></div>";
            }
          include('./content_child.php');
          echo "</div>";
          }
        }
      ?>
      </div>
      <div class='messageboard__page'>
        <?php
          $pageSql = $conn->prepare("SELECT * FROM CindyLyu_comments WHERE comment_id_at=0");
          $pageSql->execute();
          $page = $pageSql->get_result();
          $pageNum = ceil($page->num_rows / 20);
          for ($i = 1; $i <= $pageNum; $i += 1) {
            if (isset($_GET['page'])) {
              $getPage = $_GET['page'];
            } else {
              $getPage = 1; // 預設顯示第一頁
            }
            if ($getPage == $i) {
              echo "<a href='./index.php?page=". $i . "' class='messageboard__page-child active' id='" . $i . "'>" . $i . "</a>";
            } else {
              echo "<a href='./index.php?page=". $i . "' class='messageboard__page-child' id='" . $i . "'>" . $i . "</a>";
            }
          }
        ?>
      </div>
    </div>
    <script src='./handle_comment.js'></script>
  </body>
</html>