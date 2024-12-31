const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// // Load tasks from local storage
// const loadTasks = () => {
//   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks.forEach(task => addTaskToDOM(task.text, task.completed));
// };

// // Save tasks to local storage
// const saveTasks = () => {
//   const tasks = Array.from(taskList.children).map(li => ({
//     text: li.querySelector('span').textContent,
//     completed: li.classList.contains('completed'),
//   }));
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// };

const addTaskToDOM = (text, completed = false) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  if (completed) li.classList.add('completed');

  // Create a checkbox for marking the task as completed
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.checked = completed;

  // Create the delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete');

  // Append checkbox, text, and delete button to the list item
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  // Toggle task completion when checkbox is clicked
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked);
    saveTasks();
  });

  // Delete task when delete button is clicked
  deleteButton.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  // Toggle task completion when the list item is clicked (optional)
  li.addEventListener('click', () => {
    if (!checkbox.matches(':focus')) {
      checkbox.checked = !checkbox.checked;
      li.classList.toggle('completed', checkbox.checked);
      saveTasks();
    }
  });

  saveTasks();
};

// Add task on button click
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToDOM(taskText);
    taskInput.value = '';
  }
});

// Add task on "Enter" key press
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click();
  }
});

// Load tasks from local storage on page load
loadTasks();
