const userContainer = document.getElementById('taskList');
const successMessage = document.getElementById('successMessage');
const addBtn = document.getElementById('add');
const deleteBtn = document.getElementById('button2');
const taskIdInput = document.getElementById('taskId');

const getTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`);
    const todo = await response.json();
    return todo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const displayTodo = async (userId) => {
  const todo = await getTodoById(userId);
  if (todo) {
    console.log('Todo:', todo);
    let li = document.createElement('li');
    let userName = document.createElement('input');
    let checkbox = document.createElement('input');
    let deleteImg = document.createElement('img');
    let gap = document.createElement('span');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    userName.value = todo.todo;
    userName.style.width = '500px';
    userName.style.height = '20px';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });
    deleteImg.src = 'delete.png';
    deleteImg.style.width = '20px';
    deleteImg.style.height = '20px';
    deleteImg.addEventListener('click', () => {
      deleteTodoById(userId);
      li.remove();
    });
    gap.style.marginRight = '3px';
    li.appendChild(checkbox);
    li.appendChild(userName);
    li.appendChild(deleteImg);
    li.appendChild(gap);
    li.setAttribute('key', userId);
    li.setAttribute('class', 'task');
    userContainer.appendChild(li);
    successMessage.textContent = 'Task added successfully.';
  } else {
    console.log(`Todo with user ID ${userId} not found.`);
  }
};

const deleteTodoById = async (userId) => {
  try {
    const response = await fetch(`https://dummyjson.com/todos/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTasks = () => {
  const tasks = document.getElementsByClassName('task');
  while (tasks.length > 0) {
    tasks[0].remove();
  }
  successMessage.style.display = 'none';
};

addBtn.addEventListener('click', async () => {
  const userId = parseInt(taskIdInput.value);
  if (!isNaN(userId)) {
    console.log('Fetching todo for user ID:', userId);
    const todo = await getTodoById(userId);
    if (todo) {
      console.log(`Todo with user ID ${userId} added successfully.`);
      successMessage.style.display = 'block';
      successMessage.textContent = 'Task added successfully.';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 1000);
      displayTodo(userId);
    } else {
      console.log(`Todo with user ID ${userId} not found.`);
    }
  } else {
    successMessage.style.display = 'block';
    successMessage.textContent = 'Please enter a valid User ID.';
  }
});

deleteBtn.addEventListener('click', deleteTasks);

