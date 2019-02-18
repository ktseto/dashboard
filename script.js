// Background brightness component
const brightness = document.querySelector('.brightnessContainer input');
const initialBrightness = getComputedStyle(document.body).getPropertyValue('--brightness');
brightness.value = parseInt(initialBrightness.slice(0, initialBrightness.length - 1));

brightness.addEventListener('change', function() {
  document.documentElement.style.setProperty('--brightness', `${this.value}%`);
});

// To-do list component
const listItems = JSON.parse(localStorage.getItem('todolist')) || [];
const toDoList = document.querySelector('.toDoList');

const populateList = () => {
  const HTMLtext = listItems.map((item, i) => `
    <li>
      <input type="checkbox" data-index=${i} ${item.completed ? 'checked' : ''}>${item.text}
    </li>
  `).join('');
  toDoList.innerHTML = HTMLtext;
}
populateList();

const addItemForm = document.querySelector('.addItemForm');
addItemForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const inputText = this.querySelector('[type="text"]').value;
  listItems.push({
    text: inputText,
    completed: false,
  });
  populateList();
  localStorage.setItem('todolist', JSON.stringify(listItems));
  this.reset();
});
toDoList.addEventListener('click', (e) => {
  if (!e.target.matches('input')) return;

  const index = e.target.dataset.index;
  listItems[index].completed = !listItems[index].completed;
  localStorage.setItem('todolist', JSON.stringify(listItems));
});