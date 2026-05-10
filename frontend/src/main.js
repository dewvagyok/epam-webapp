import './style.css';

const API_URL = 'http://localhost:3000/tasks';

async function fetchTasks() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Hiba a letöltéskor');
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

async function deleteTask(id) {
  try {
    // JAVÍTVA: Használj backtick-et (`)!
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  } catch (error) {
    console.error('Hiba a törlésnél:', error);
  }
}

async function toggleTask(task) {
  try {
    // JAVÍTVA: A PATCH-nek el kell küldenie az új állapotot a body-ban
    await fetch(`${API_URL}/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }) // Megfordítjuk az állapotot
    });
    fetchTasks();
  } catch (error) {
    console.error('Hiba a módosításnál:', error);
  }
}

function renderTasks(tasks) {
  const listElement = document.querySelector('#task-list');
  if (!listElement) return; // Biztonsági ellenőrzés
  listElement.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');

    li.style.textDecoration = task.completed ? 'line-through' : 'none';
    li.style.opacity = task.completed ? '0.6' : '1';

    li.innerHTML = `
      <span>${task.title}</span>
      <div class="actions">
        <button class="done-btn">${task.completed ? 'Mégse' : 'Kész'}</button>
        <button class="delete-btn">Törlés</button>
      </div>
    `;

    // JAVÍTVA: Itt átadjuk az egész task objektumot a toggleTask-nak
    li.querySelector('.done-btn').onclick = () => toggleTask(task);
    li.querySelector('.delete-btn').onclick = () => deleteTask(task.id);

    listElement.appendChild(li);
  });
}

// Kezdés
fetchTasks();

const input = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');

addBtn.onclick = async () => {
  if (!input.value.trim()) {
    alert('Adj meg egy feladatot!');
    return;
  }

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // JAVÍTVA: Érdemes alapértelmezett 'completed' értéket is küldeni
      body: JSON.stringify({ title: input.value, completed: false })
    });

    input.value = '';
    fetchTasks();
  } catch (error) {
    console.error('Hiba a hozzáadásnál:', error);
  }
};