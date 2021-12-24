const input = document.querySelector('.todo_input');
const form = document.querySelector('.input_container');
const remainingListContainer = document.querySelector(
  '.remaining_list_container'
);
const completedListContainer = document.querySelector(
  '.completed_list_container'
);

const remainingList = [];
const completedList = [];

form.addEventListener('submit', function (e) {
  if (!input.value) {
    alert('please fill something in inputs');
    return;
  }
  e.preventDefault();

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

const createTodo = function () {
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
              <span class="created">
                  ${l.todoDate}
              </span>
              </span>

              <span class="button_container">

                  <button class="important_btn">
                  <input type="checkbox" id="add_to_important${
                    i + 1
                  }" class="isImportant_checkbox">
                    <label for="add_to_important${
                      i + 1
                    }" class="add_to_important">
                          <i class="far fa-star"></i>
                    </label>
                          
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
    const todo = ` <span class="completed_list  ${
      l.isImportant ? 'important' : ''
    } completed" data-index="${i}">
                    <span class="todo">
                        <span class="todo_name">
                          ${i + 1}. ${l.todoName}
                        </span>
                        <span class="created">
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
};

const action = function () {
  remainingListContainer.addEventListener('click', function (e) {
    if (e.target.closest('.important_btn')) {
      const element = e.target.closest('.remaining_list');
      const n = element.dataset.index;

      if (element.querySelector('.isImportant_checkbox').checked) {
        remainingList[n].isImportant = true;
        element.classList.add('important');
      } else {
        remainingList[n].isImportant = false;
        element.classList.remove('important');
      }
    }

    if (e.target.closest('.remove_btn')) {
      const element = e.target.closest('.remaining_list');
      element.classList.add('remove_animation');

      const n = element.dataset.index;
      remainingList.splice(n, 1);
      setTimeout(function () {
        createTodo();
      }, 200);
    }

    if (e.target.closest('.completed_btn')) {
      const element = e.target.closest('.remaining_list');
      element.classList.add('completed_animation');

      const n = element.dataset.index;
      completedList.push(remainingList.splice(n, 1).pop());

      setTimeout(function () {
        createTodo();
      }, 200);
    }
  });

  completedListContainer.addEventListener('click', function (e) {
    if (e.target.closest('.remove_btn')) {
      const element = e.target.closest('.completed_list');
      element.classList.add('remove_animation');

      const n = element.dataset.index;
      completedList.splice(n, 1);
      setTimeout(function () {
        createTodo();
      }, 200);
    }

    if (e.target.closest('.undo_btn')) {
      const element = e.target.closest('.completed_list');
      element.classList.add('remove_animation');

      const n = element.dataset.index;
      remainingList.push(completedList.splice(n, 1).pop());
      setTimeout(function () {
        createTodo();
      }, 200);
    }
  });
};

action();
