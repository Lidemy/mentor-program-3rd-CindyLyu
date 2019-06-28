function handleUpdate() {
  const editButton = document.querySelectorAll('.messageboard__latestpost-edit');
  const id = document.querySelectorAll('.messageboard__latestpost-id.self');
  for (let i = 0; i < editButton.length; i += 1) {
    editButton[i].onclick = function () { // 編輯按鈕點擊事件
      const commentId = id[i].innerText;
      const latestPostContent = document.querySelector(`.messageboard__latestpost-content.self${CSS.escape(commentId)}`);
      latestPostContent.outerHTML = `<form method='POST' action='./handle_update_comment.php' class='message__latestpost-editarea self${commentId}'>
       <textarea name='content' rows='5'>${latestPostContent.innerText}</textarea>
       <input type='hidden' name='comment_id' value='${commentId}'>
       <input type='submit' class='message_latestpost-editsubmit' value='送出' /></form>`;
      editButton[i].outerHTML = `<div class='messageboard__latestpost-canceledit'>取消編輯</div>`;
      const cancelEdit = document.querySelectorAll('.messageboard__latestpost-canceledit');
      for (let k = 0; k < cancelEdit.length; k += 1) {
        cancelEdit[k].onclick = function () { // 取消編輯按鈕點擊事件
          const cancelId = id[i].innerText;
          const editArea = document.querySelector(`.message__latestpost-editarea.self${CSS.escape(cancelId)}`);
          editArea.outerHTML = `<div class='messageboard__latestpost-content self${cancelId}'>${latestPostContent.innerText}</div>`;
          cancelEdit[k].outerHTML = `<div><a class='messageboard__latestpost-edit' title='編輯留言'><i class='far fa-edit'></i></a></div>`;
          handleUpdate();
        };
      }
    };
  }
}

handleUpdate();
