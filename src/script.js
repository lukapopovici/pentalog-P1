
function loadTasks() {
  const allTasks = localStorage.getItem('tasks');
  if (allTasks) {
      const parsed = JSON.parse(allTasks);
      for (const task of parsed) {
        add_task(task.title, task.description, task.email);
        console.log(task.title);
      }
  } 
}

function deleteTask(taskTitle, taskDesc, taskEmail) {
  console.log(taskTitle);
  let allTasks = localStorage.getItem('tasks');

  if (allTasks) {
    allTasks = JSON.parse(allTasks);
    if (Array.isArray(allTasks)) {
      allTasks = allTasks.filter( (task) => task.title!== taskTitle);
      localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
  }
}

function writeDB(taskTitle, taskDesc, taskEmail) {
  let allTasks = localStorage.getItem('tasks');
  const newTask = {
    title: taskTitle,
    description: taskDesc,
    email: taskEmail
  };

  if (allTasks) {
    allTasks = JSON.parse(allTasks);
    if (Array.isArray(allTasks)) {
      allTasks.push(newTask);
    } else {
      allTasks = [newTask];
    }
  } else {
    allTasks = [newTask];
  }

  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function openDialog() {
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'block';
  }

function handleSubmit(event) {
    event.preventDefault();
    const TI = document.getElementById('TaskInput').value;
    const TD = document.getElementById('TaskDescription').value;
    const TE = document.getElementById('TaskAsignee').value;
    const dialog = document.getElementById('dialog');
    dialog.style.display = 'none';
    add_task(TI,TD,TE);
    writeDB(TI,TD,TE);
}

function taskDone(button) {
  const task = button.parentNode;
  const isDone = task.getAttribute('isDone') === 'true';

  if (!isDone) {
    task.setAttribute('isDone', 'true');
    task.style.backgroundColor = 'green';
    button.parentNode.removeChild(button);
  } 
}

function removeTask(button) {
  const task = button.parentNode;
  deleteTask(task.childNodes[2].textContent, task.childNodes[4].textContent);
  console.log(task.childNodes[2].textContent, task.childNodes[4].textContent);
  task.remove()
}


function add_task(taskTitle, taskDesc, taskEmail) {

  const task = document.createElement('div');
  task.id = "TaskID";
  task.setAttribute('isDone', false);
  task.innerHTML = `
    <strong>Title:</strong> ${taskTitle}<br>
    <strong>Description:</strong> ${taskDesc}<br>
    <strong>Email:</strong> ${taskEmail}<br>
    <button onclick="removeTask(this)">Remove</button><br>
    <button onclick="taskDone(this)">Completed</button><br>
  `;
  document.getElementById('tasks').appendChild(task);
}
 loadTasks();
  document.getElementById('FORM').addEventListener('submit', handleSubmit);
