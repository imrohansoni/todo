const input = document.querySelector('.todo_input');
const form = document.querySelector('.input_container');
const remainingList = document.querySelector('.remaining_list_container');
const completedList = document.querySelector('.completed_list_container');
const addToImportant = document.querySelector('#add_to_important');

const remaining = [];
const completed = [];

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
  const date = new Date();

  const todoValue = input.value;
  const todoDate = `${date.getDate()} ${
    years[date.getMonth()]
  } ${date.getFullYear()}`;

  createTodo(todoDate, todoValue, addToImportant.checked);
  input.value = ``;
});

const createTodo = function (date, todoValue, isImportant) {
  const todo = ` <li class="remaining_list  ${isImportant ? 'important' : ''}" >
                    <span class="todo">
                        <span class="todo_name">
                            ${todoValue}
                        </span>
                        <span class="created">
                            ${date}
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
                </li>`;

  remainingList.insertAdjacentHTML('afterbegin', todo);
};

const action = function () {
  remainingList.addEventListener('click', function (e) {
    if (e.target.closest('.important_btn')) {
      e.target.closest('.remaining_list').classList.toggle('important');
    }
    if (e.target.closest('.remove_btn')) {
      const element = e.target.closest('.remaining_list');
      element.classList.add('remove_animation');

      setTimeout(function () {
        element.remove();
      }, 300);
    }
  });
};
action();
