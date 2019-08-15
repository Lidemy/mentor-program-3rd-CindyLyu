/* eslint-env jquery */

const list = [
  {
    id: 1,
    complete: false,
    item: '課程影片',
  },
  {
    id: 2,
    complete: true,
    item: 'hw1：Gulp',
  },
  {
    id: 3,
    complete: true,
    item: 'hw2：Webpack',
  },
  {
    id: 4,
    complete: true,
    item: 'hw3：Todo List',
  },
  {
    id: 5,
    complete: false,
    item: '看同學的 code',
  },
  {
    id: 6,
    complete: false,
    item: 'week18 自我檢測',
  },
];


let itemIndex;

function render() {
  $('.todolist__content').empty();
  for (let i = 0; i < list.length; i += 1) {
    let itemContent;
    if (list[i].complete === true) {
      itemContent = `<div class='list-group-item list-group-item-action' id=${list[i].id}><i class="far fa-check-square"></i><span class='todolist__content-item'>${list[i].item}</span><i class="fas fa-times"></i></div>`;
    } else {
      itemContent = `<div class='list-group-item list-group-item-action' id=${list[i].id}><i class="far fa-square"></i><span class='todolist__content-item'>${list[i].item}</span><i class="fas fa-times"></i></div>`;
    }
    $('.todolist__content').append(itemContent);
  }
}

render();

// 計算完成度
function countProcess() {
  let completeItem = 0;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].complete === true) {
      completeItem += 1;
    }
  }
  const totalItem = list.length;
  const completePercentage = Math.round((completeItem / totalItem) * 100);
  $('.progress-bar').css('width', `${completePercentage}%`);
  $('.progress-bar').text(`${completePercentage} %`);
}

// 計算新的 id 值
function createNewId() {
  let id = 6;
  return () => {
    id += 1;
    return id;
  };
}

const newId = createNewId();

// 增加項目
$('.todolist').on('click', '.todolist__additem-add', () => {
  const inputValue = $('.todolist__additem-input').val();
  list.unshift({ id: newId(), complete: false, item: inputValue });
  $('.todolist__additem-input').val('');
  countProcess();
  render();
});

function findIndex(num) {
  const id = Number(num);
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].id === id) {
      return index;
    }
  }
  return 'error';
}

// 標註已完成項目
$('.todolist').on('click', '.fa-square', (e) => {
  itemIndex = findIndex(e.target.parentNode.id);
  list[itemIndex].complete = true;
  countProcess();
  render();
});

// 刪除項目
$('.todolist').on('click', '.fa-times', (e) => {
  itemIndex = findIndex(e.target.parentNode.id);
  list.splice(itemIndex, 1);
  countProcess();
  render();
});

// 取消標註已完成
$('.todolist__content').on('click', '.fa-check-square', (e) => {
  itemIndex = findIndex(e.target.parentNode.id);
  list[itemIndex].complete = false;
  countProcess();
  render();
});
