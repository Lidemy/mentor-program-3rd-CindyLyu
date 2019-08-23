<?php
  include './conn.php';
  $connection = $conn;

  function insert_todo() {
    global $connection;
    $todo_name = $_POST["todo_name"];
    $stmt = $connection->prepare("INSERT INTO CindyLyu_todos SET name=?");
    $stmt->bind_param("s", $todo_name);
    if ($stmt->execute()) {
      echo 'todo added successfully';
    } else {
      echo 'todo addition failed';
    }
  }
  
  function get_todos($todo_id=0) {
    global $connection;
    $sql = "SELECT * FROM CindyLyu_todos";
    if ($todo_id != 0) {
      $sql .=" WHERE id=".$todo_id." LIMIT 1";
    }
    $response = array();
    $result = $connection->query($sql);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()){
        $response[] = $row; // 等同於 array_push($response, $row);
      }
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
  }

  function delete_todo($todo_id) {
    global $connection;
    $stmt = $connection->prepare("DELETE FROM CindyLyu_todos WHERE id=?");
    $stmt->bind_param("i", $todo_id);
    if ($stmt->execute()) {
      echo 'todo deleted successfully';
    } else {
      echo 'todo deletion failed';
    }
  }

  function update_todo($todo_id) {
    global $connection;
    parse_str(file_get_contents("php://input"), $post_vars);
    $todo_name = $post_vars["todo_name"];
    $complete = $post_vars["complete"];
    if (isset($todo_name)) {
      $stmt = $connection->prepare("UPDATE CindyLyu_todos SET name=? WHERE id=?");
      $stmt->bind_param("si", $todo_name, $todo_id);
    } else if (isset($complete)) {
      $stmt = $connection->prepare("UPDATE CindyLyu_todos SET complete=? WHERE id=?");
      $stmt->bind_param("si", $complete, $todo_id);
    }
    if($stmt->execute()) {
      echo 'todo updated successfully';
    } else {
      echo 'todo updation failed';
    }
  }
?>