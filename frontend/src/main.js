import './style.css'

const API_URL = 'http://localhost:3000/tasks';

async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

function renderTasks(tasks) {
  const listElement = document.querySelector('#task-list');
  listElement.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    listElement.appendChild(li);
  });
}

fetchTasks();

const input = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');

addBtn.onclick = async () => {
  console.log('Add button clicked', input.value);
  if (!input.value){
    alert('Adj meg egy feladatot!');
    return;
  } 

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input.value })
  });

  input.value = '';
  fetchTasks();
};

