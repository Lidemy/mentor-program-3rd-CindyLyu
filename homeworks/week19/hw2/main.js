/* eslint-env jquery */

let list;
let todoName;
const baseUrl = 'http://cindylyu.tw/todolist/api/todo.php';

function render() {
  $('.todolist__content').empty();
  const todoNameData = [];
  for (let i = list.length - 1; i >= 0; i -= 1) {
    let todo;
    if (list[i].complete === '1') {
      todo = `<div class='list-group-item list-group-item-action' id=${list[i].id}><i class="far fa-check-square"></i><span class='todolist__content-item'></span><i class="fas fa-pen"></i><i class="fas fa-times"></i></div>`;
      todoNameData.push(list[i].name);
    } else {
      todo = `<div class='list-group-item list-group-item-action' id=${list[i].id}><i class="far fa-square"></i><span class='todolist__content-item'></span><i class="fas fa-pen"></i><i class="fas fa-times"></i></div>`;
      todoNameData.push(list[i].name);
    }
    $('.todolist__content').append(todo);
  }
  const todoContent = $('.todolist__content-item');
  for (let k = 0; k < list.length; k += 1) {
    todoContent[k].innerText = todoNameData[k];
  }
}

// 計算完成度
function countProcess() {
  let completeItem = 0;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].complete === '1') {
      completeItem += 1;
    }
  }
  const totalItem = list.length;
  const completePercentage = Math.round((completeItem / totalItem) * 100);
  $('.progress-bar').css('width', `${completePercentage}%`);
  $('.progress-bar').text(`${completePercentage} %`);
}

function createGetRequest() {
  $.ajax({
    type: 'GET',
    url: baseUrl,
    dataType: 'text',
    success: (data) => {
      list = JSON.parse(data);
      render();
      countProcess();
    },
    error(jqXHR, textStatus, errorThrown) {
      console.log(`${textStatus} ${errorThrown}`);
    },
  });
}

createGetRequest();

// 增加項目
$('.todolist').on('click', '.todolist__additem-add', () => {
  const inputValue = $('.todolist__additem-input').val();
  $.ajax({
    type: 'POST',
    url: baseUrl,
    dataType: 'text',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      todo_name: inputValue,
    },
    success: (res) => {
      console.log(res);
      createGetRequest();
    },
    error(jqXHR, textStatus, errorThrown) {
      console.log(`${textStatus} ${errorThrown}`);
    },
  });
  $('.todolist__additem-input').val('');
});

// 標註已完成項目
$('.todolist').on('click', '.fa-square', (e) => {
  const { id } = e.target.parentNode;
  $.ajax({
    type: 'PATCH',
    url: `${baseUrl}?todo_id=${id}`,
    dataType: 'text',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      complete: 1,
    },
    success: (res) => {
      console.log(res);
      createGetRequest();
    },
    error(jqXHR, textStatus, errorThrown) {
      console.log(`${textStatus} ${errorThrown}`);
    },
  });
});

// 刪除項目
$('.todolist').on('click', '.fa-times', (e) => {
  const { id } = e.target.parentNode;
  $.ajax({
    type: 'DELETE',
    url: `${baseUrl}?todo_id=${id}`,
    dataType: 'text',
    success: (res) => {
      console.log(res);
      createGetRequest();
    },
    error(jqXHR, textStatus, errorThrown) {
      console.log(`${textStatus} ${errorThrown}`);
    },
  });
});

// 取消標註已完成
$('.todolist__content').on('click', '.fa-check-square', (e) => {
  const { id } = e.target.parentNode;
  $.ajax({
    type: 'PATCH',
    url: `${baseUrl}?todo_id=${id}`,
    dataType: 'text',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      complete: 0,
    },
    success: (res) => {
      console.log(res);
      createGetRequest();
    },
    error(jqXHR, textStatus, errorThrown) {
      console.log(`${textStatus} ${errorThrown}`);
    },
  });
});

// 編輯 todo
$('.todolist__content').on('click', '.fa-pen', (e) => {
  todoName = e.target.parentNode.innerText;
  e.target.parentNode.childNodes[1].outerHTML = `<input class='todolist__content-edit' value='${todoName}'></input><span class='todolist__content-message'> （編輯後按 enter 送出）</span>`;
  e.target.outerHTML = '<button type="button" class="btn btn-link">取消編輯</button>';
});

// 取消編輯 todo
$('.todolist__content').on('click', '.btn-link', (e) => {
  todoName = e.target.parentNode.children[1].defaultValue;
  e.currentTarget.offsetParent.children[2].outerHTML = '';
  e.target.parentNode.childNodes[1].outerHTML = `<span class="todolist__content-item">${todoName}</span>`;
  e.target.outerHTML = '<i class="fas fa-pen"></i>';
});

// 編輯後 enter 送出
$('.todolist__content').keypress((e) => {
  const { id } = e.target.parentNode;
  const { value } = e.target.parentNode.children[1];
  if (e.keyCode === 13) {
    $.ajax({
      type: 'PATCH',
      url: `${baseUrl}?todo_id=${id}`,
      dataType: 'text',
      contentType: 'application/x-www-form-urlencoded',
      data: {
        todo_name: value,
      },
      success: (res) => {
        console.log(res);
        createGetRequest();
      },
      error(jqXHR, textStatus, errorThrown) {
        console.log(`${textStatus} ${errorThrown}`);
      },
    });
  }
});
