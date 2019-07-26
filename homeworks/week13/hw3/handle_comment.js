/* eslint-env jquery */
/* eslint-disable no-alert */

let latestpostContent;
let latestpostSubContent;
let data;

function getComment(id, content, nickname, createdAt, userId) {
  return `<div class='messageboard__latestpost ${userId}'>
                         <div class='messageboard__latestpost-nickname'><i class='far fa-user-circle'></i>${nickname}<span class='messageboard__newpost-nicknameregion-time'>${createdAt}</span></div>
                         <div><a href='./update_comment.php?content=${content}&id=${id}' class='messageboard__latestpost-edit title='編輯留言'><i class='far fa-edit'></i></a></div>
                         <form>
                           <input name='id'  class='hidden' value='${id}'></input>
                           <div><input class='messageboard__latestpost-delete self${id}' title='刪除留言' value=''><i class='far fa-trash-alt'></i></input></div>
                         </form>
                         <div class='messageboard__latestpost-content self${id}'>${content}</div>
                         <div class='messageboard__latestpost-id self hidden'>${id}</div>
                         <div class='childcontent${id}'></div>
                         <form class='messageboard__latestpost-subnewpost ${id}'>
                           <input name='comment_id_at${id}' class='hidden' value='${id}'>
                           <div class='messageboard__newpost-nicknameregion'>
                             <a class='far fa-user-circle'></a><input name='nickname' readonly='readonly' value='${nickname}'>
                           </div>
                           <div><textarea class='messageboard__newpost-content${id}' name='content' placeholder='輸入留言內容'></textarea></div>
                           <input class='id' name='userId' type='hidden' value='${userId}'>
                           <div><input class='messageboard__newpost-submit' readonly='readonly' value='送出'></div>
                         </form></div>`;
}

function getSubComment(id, content, nickname, createdAt, userId, commentUseridAt) {
  if (userId === commentUseridAt) { // 如果是原 po 會有不同的 class
    return `<div class='messageboard__latestpost-sbucontentmessage origin ${userId}'><div class='messageboard__latestpost-nickname'><i class='far fa-user-circle'></i>${nickname}<span class='messageboard__newpost-nicknameregion-time'>${createdAt}</span></div>
                              <div><a href='./update_comment.php?content=${content}&id=${id}' class='messageboard__latestpost-edit title='編輯留言'><i class='far fa-edit'></i></a></div>
                              <form>
                                <input name='id' class='hidden' value='${id}'></input>
                                <div><input class='messageboard__latestpost-childdelete self${id}' title='刪除留言' value=''><i class='far fa-trash-alt'></i></input></div>
                              </form>
                              <div class='messageboard__latestpost-content self${id}'>${content}</div>
                              <div class='messageboard__latestpost-id self hidden'>${id}</div>
                            </div>`;
  }
  return `<div class='messageboard__latestpost-sbucontentmessage'><div class='messageboard__latestpost-nickname'><i class='fas fa-user-circle'></i>${nickname}<span class='messageboard__newpost-nicknameregion-time'>${createdAt}</span></div>
                            <div><a href='./update_comment.php?content=${content}&id=${id}' class='messageboard__latestpost-edit title='編輯留言'><i class='far fa-edit'></i></a></div>
                            <form>
                              <input name='id' class='hidden' value='${id}'></input>
                            <div><input class='messageboard__latestpost-childdelete self${id}' title='刪除留言' value=''><i class='far fa-trash-alt'></i></input></div>
                            </form>
                            <div class='messageboard__latestpost-content self${id}'>${content}</div>
                            <div class='messageboard__latestpost-id self hidden'>${id}</div>
                          </div>`;
}

// 新增主留言
$('.messageboard__newpost').on('click', '.messageboard__newpost-submit', () => {
  const content = $('.messageboard__newpost-content').val();
  $.ajax({
    type: 'POST',
    url: './handle_comment.php',
    dataType: 'text',
    data: {
      content,
    },
    success: (result) => {
      data = JSON.parse(result);
      latestpostContent = getComment(data.id, data.content, data.nickname, data.created_at, data.user_id);
      $('.messageboard__message-success').hide(500); // 將登入成功訊息隱藏
      $('.messageboard__newpost-content').val('');
      $('.messageboard__latestpost-region').prepend(latestpostContent);
    },
    error(jqXHR, textStatus, errorThrown) {
      alert('新增失敗', errorThrown);
    },
  });
});

// 新增子留言
$('.messageboard__latestpost-region').on('click', '.messageboard__newpost-submit', (e) => {
  const nickname = $("[name='nickname']").val();
  const commentIdAt = e.target.parentNode.parentNode.classList[1]; // 主留言 id
  const commentUseridAt = e.target.parentNode.parentNode.parentNode.classList[1]; // 主留言的使用者 id
  const content = $(`.messageboard__newpost-content${commentIdAt}`).val();
  $.ajax({
    type: 'POST',
    url: './handle_sub_comment.php',
    dataType: 'text',
    data: {
      content,
      comment_id_at: commentIdAt,
      nickname,
    },
    success: (result) => {
      data = JSON.parse(result);
      latestpostSubContent = getSubComment(data.id, data.content, data.nickname, data.created_at, data.user_id, Number(commentUseridAt));
      $('.messageboard__message-success').hide(500); // 將登入成功訊息隱藏
      $(`.messageboard__newpost-content${commentIdAt}`).val('');
      $(`.childcontent${commentIdAt}`).append(latestpostSubContent); // 順序還需要優化，當已新增過子留言並經過重新整理後再次新增的子留言就不是在最後的順序顯示
    },
    error(jqXHR, textStatus, errorThrown) {
      alert('新增失敗', errorThrown);
    },
  });
});

// 刪除主留言
$('.messageboard__latestpost-region').on('click', '.messageboard__latestpost-delete', (e) => {
  const selfClass = e.target.classList[1];
  const commentId = selfClass.replace('self', '');
  if (!confirm('確定要刪除嗎？')) return;
  $.ajax({
    type: 'POST',
    url: './handle_delete_comment.php',
    data: {
      id: commentId,
    },
    success() {
      $('.messageboard__message-success').hide(500);
      $(e.target.parentNode.parentNode.parentNode).hide(500);
    },
    error(jqXHR, textStatus, errorThrown) {
      alert('刪除失敗', errorThrown);
    },
  });
});

// 刪除子留言
$('.messageboard__latestpost-region').on('click', '.messageboard__latestpost-childdelete', (e) => {
  const selfClass = e.target.classList[1];
  const commentId = selfClass.replace('self', ''); // 找該留言的 id 值
  $.ajax({
    type: 'POST',
    url: './handle_delete_comment.php',
    data: {
      id: commentId,
    },
    success() {
      if (!confirm('確定要刪除嗎？')) return;
      $('.messageboard__message-success').hide(500);
      $(e.target.parentNode.parentNode.parentNode).hide(500);
    },
    error(jqXHR, textStatus, errorThrown) {
      alert('刪除失敗', errorThrown);
    },
  });
});
