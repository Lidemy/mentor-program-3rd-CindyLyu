<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Credentials: true");
  require_once('./conn.php');
  include_once('./utils.php');

  $request_method=$_SERVER["REQUEST_METHOD"];
  
  switch($request_method) {
    case 'GET':
      if(!empty($_GET["todo_id"])) {
        $todo_id = intval($_GET["todo_id"]);
        get_todos($todo_id);
      } else {
        get_todos();
      }
      break;
    case 'POST':
      insert_todo();
      break;
    case 'PATCH':
      $todo_id = intval($_GET["todo_id"]);
      update_todo($todo_id);
      break;
    case 'DELETE':
      $todo_id = intval($_GET["todo_id"]);
      delete_todo($todo_id);
      break;
    default:
      header("HTTP/1.0 405 Method Not Allowed");
      break;
  }
?>