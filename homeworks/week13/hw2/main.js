/* eslint-env jquery */

let completeItem = 3; // 目前已標記完成數
let totalItem = 6; // 目前總項目數
let item;

// 完成度
function countProcess() {
  const completePercentage = Math.round((completeItem / totalItem) * 100);
  $('.progress-bar').css('width', `${completePercentage}%`);
  $('.progress-bar').text(`${completePercentage} %`);
}

// 標註已完成項目
function markCompleted() {
  $('.todolist__content').on('click', '.fa-square', (e) => {
    item = e.target;
    item.outerHTML = "<i class='far fa-check-square'></i>";
    completeItem += 1;
    countProcess();
  });
}

// 取消標註已完成
function returnToDoItem() {
  $('.todolist__content').on('click', '.fa-check-square', (e) => {
    item = e.target;
    item.outerHTML = "<i class='far fa-square'></i>";
    completeItem -= 1;
    countProcess();
  });
}


// 刪除項目
function deleteItem() {
  $('.todolist__content').on('click', '.fa-times', (e) => {
    item = e.target.parentNode;
    const itemOuter = item.outerHTML;
    if (itemOuter.indexOf('check') >= 0) { // 如果刪除的項目是已完成時
      completeItem -= 1;
    }
    item.outerHTML = '';
    totalItem -= 1;
    countProcess();
  });
}


// 增加項目
function addItem() {
  const itemContent = $('.todolist__content');
  $('body').on('click', '.todolist__additem-add', () => {
    const inputValue = $('.todolist__additem-input').val();
    if (inputValue === '') return;
    const addItemContent = `<div class='list-group-item list-group-item-action'><i class="far fa-square"></i><span class='todolist__content-item'>${inputValue}</span><i class="fas fa-times"></i></div>`;
    itemContent.prepend(addItemContent);
    $('.todolist__additem-input').val('');
    totalItem += 1;
    markCompleted();
    returnToDoItem();
    deleteItem();
    countProcess();
  });
}

returnToDoItem();
markCompleted();
addItem();
deleteItem();
countProcess();
