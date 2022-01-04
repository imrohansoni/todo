const input = document.querySelector('.todo_input');
const form = document.querySelector('.input_container');
const remainingListContainer = document.querySelector(
  '.remaining_list_container'
);
const completedListContainer = document.querySelector(
  '.completed_list_container'
);

const myTodoList = document.querySelector('.my_todo_list');
const myImportantList = document.querySelector('.my_important_list');
const myTodo = document.querySelector('.my_todo');

const todoCount = document.querySelector('.todo_count');
const importantCount = document.querySelector('.important_count');
const creator = document.querySelector('.creator');
const mainDate = document.querySelector('.main_date');

const remainingList = [];
const completedList = [];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const years = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

const init = function () {
  const m = new Date();
  mainDate.textContent = `${days[m.getDay()]}, ${m.getDate()} ${
    years[m.getMonth()]
  } ${m.getFullYear()}`;

  creator.textContent = `created by rohan soni`;

  formSubmit();
  action();
  getData();
  navigationMenu();
};

const formSubmit = function () {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!input.value) {
      return;
    }

    const d = new Date();
    const todoDate = `${d.getDate()} ${years[d.getMonth()]} ${d.getFullYear()}`;
    const todoName = input.value;

    createTodo(todoName, todoDate, false);

    remainingList.push({
      todoName: todoName,
      todoDate: todoDate,
      isImportant: false,
    });
    createTodo();

    input.value = ``;
  });
};

const getData = function () {
  JSON.parse(localStorage.getItem('remainingList')).forEach(function (l) {
    remainingList.push(l);
  });

  JSON.parse(localStorage.getItem('completedList')).forEach(function (l) {
    completedList.push(l);
  });

  createTodo();
};

const createTodo = function () {
  todoCount.textContent = remainingList.length;
  remainingListContainer.innerHTML = '';
  completedListContainer.innerHTML = '';

  remainingList.forEach(function (l, i) {
    const todo = ` 
    <span class="remaining_list  ${
      l.isImportant ? 'important' : ''
    }" data-index="${i}">
          <span class="todo">
              <span class="todo_name">
                  ${i + 1}. ${l.todoName}
              </span>
              <span class="date">
                  ${l.todoDate}
              </span>
              </span>

              <span class="button_container">
                  <button class="important_btn">
                   
                       <i class="far fa-star"></i>
                  </button>
                  <button class="completed_btn">
                      <i class="fas fa-check-circle"></i>
                  </button>
                  <button class="remove_btn">
                      <i class="fas fa-trash-alt"></i>
                  </button>
              </span>
      </span>`;

    remainingListContainer.insertAdjacentHTML('beforeEnd', todo);
  });

  completedList.forEach(function (l, i) {
    const todo = ` 
    <span class="completed_list ${
      l.isImportant ? 'important' : ''
    } completed" data-index="${i}">
          <span class="todo">
              <span class="todo_name">
                  ${i + 1}. ${l.todoName}
              </span>
              <span class="date">
                  ${l.todoDate}
              </span>
          </span>

          <span class="button_container">
              <button class="undo_btn">
                    <i class="fas fa-undo-alt"></i>
              </button>
              <button class="important_btn">
                    <i class="far fa-star"></i>
              </button>
              <button class="remove_btn">
                    <i class="fas fa-trash-alt"></i>
              </button>
          </span>
      </span>`;

    completedListContainer.insertAdjacentHTML('beforeEnd', todo);
  });

  localStorage.setItem('remainingList', JSON.stringify(remainingList));
  localStorage.setItem('completedList', JSON.stringify(completedList));
};

const action = function () {
  remainingListContainer.addEventListener('click', function (e) {
    if (!e.target.closest('.remaining_list')) return;
    const element = e.target.closest('.remaining_list');
    const n = element.dataset.index;

    if (e.target.closest('.important_btn')) {
      if (!element.classList.contains('important')) {
        remainingList[n].isImportant = true;
        element.classList.add('important');
      } else {
        remainingList[n].isImportant = false;
        element.classList.remove('important');
      }
    }

    if (e.target.closest('.remove_btn')) {
      element.classList.add('remove_animation');
      remainingList.splice(n, 1);
    }

    if (e.target.closest('.completed_btn')) {
      element.classList.add('completed_animation');
      completedList.push(remainingList.splice(n, 1).pop());
    }

    setTimeout(function () {
      createTodo();
    }, 200);
  });

  completedListContainer.addEventListener('click', function (e) {
    if (!e.target.closest('.completed_list')) return;
    const element = e.target.closest('.completed_list');
    const n = element.dataset.index;

    if (e.target.closest('.remove_btn')) {
      element.classList.add('remove_animation');
      completedList.splice(n, 1);
    }

    if (e.target.closest('.undo_btn')) {
      element.classList.add('remove_animation');
      remainingList.push(completedList.splice(n, 1).pop());
    }

    setTimeout(function () {
      createTodo();
    }, 200);
  });
};

const navigationMenu = function () {
  myTodoList.addEventListener('click', function () {
    myTodo.classList.replace('important_todo_active', 'todo_active');
  });
  myImportantList.addEventListener('click', function () {
    myTodo.classList.replace('todo_active', 'important_todo_active');
  });
};

init();
