// Background brightness component
const brightness = document.querySelector('.brightnessContainer input');
const initialBrightness = getComputedStyle(document.body).getPropertyValue('--brightness');
brightness.value = parseInt(initialBrightness.slice(0, initialBrightness.length - 1));

brightness.addEventListener('change', () => {
  document.documentElement.style.setProperty('--brightness', `${brightness.value}%`);
});

const listItems = localStorage.getItem('todolist') || [];
// item = { text: '', completed: true }

const toDoList = document.querySelector('.toDoList');
const HTMLtext = listItems.map((item) => `
  <li>
    <input type="checkbox" ${item.completed ? 'checked' : ''}>${item.text}
  </li>
`);