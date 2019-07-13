<?php
  // 從 comments 抓取資料
  require_once('./conn.php');
  $stmt = $conn->prepare("SELECT * FROM CindyLyu_comments ORDER BY created_at ASC");
  $stmt->execute();
  $result = $stmt->get_result();
  $arr = array();
  if ($result->num_rows >= 0) {
    while($row = $result->fetch_array())
      array_push($arr, $row);
  }
  echo json_encode($arr, JSON_UNESCAPED_UNICODE);
?>