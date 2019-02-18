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

// Doodle component
const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight * 0.3;
canvas.width = window.innerWidth * 0.4;

const ctx = canvas.getContext('2d');
let strokeHue = 0;
ctx.lineCap = 'round';
ctx.lineWidth = 30;

let isDrawing = false;
let lastX, lastY;
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = `hsl(${strokeHue}, 100%, 50%)`;
  ctx.stroke();
  strokeHue += 1;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

const clearCanvas = document.querySelector('.clearCanvas');
clearCanvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Sidebar
let showSidebar = true;
let sidebar = document.querySelector('.sidebar');
sidebar.addEventListener('click', () => {
  showSidebar = !showSidebar;
  if (showSidebar) {
    sidebar.classList.add('active');
  } else {
    sidebar.classList.remove('active');
  }
});

// Keyboard
const checkbox = document.querySelector('.enableContainer input');
let keyboardEnabled = false;
checkbox.addEventListener('click', () => {
  keyboardEnabled = checkbox.checked;
});

window.addEventListener('keyup', (e) => {
  const key = e.key.toUpperCase();
  if (!['A', 'S', 'D', 'F', 'G', 'H', 'J'].includes(key)) return;
  if (!keyboardEnabled) return;

  const audio = document.querySelector(`audio[data-key="${key}"]`);
  audio.currentTime = 0;
  audio.play();

  const kbd = document.querySelector(`kbd[data-key="${key}"]`);
  kbd.classList.add('playing');
});

const audioKeys = document.querySelectorAll('kbd');
audioKeys.forEach((kbd) => {
  kbd.addEventListener('transitionend', () => kbd.classList.remove('playing'));
});

// Sidebar

// Sidebar-date
const months = {
  1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
  7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December',
};

const formatDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${months[month]} ${day}`;
};

const date = document.querySelector('.date');
date.textContent = formatDate(new Date());

// Sidebar-clock
const hourHand = document.querySelector('.hourHand');
const minuteHand = document.querySelector('.minuteHand');
const secondHand = document.querySelector('.secondHand');

function updateTime() {
  const now = new Date();

  const hourDegree = now.getHours() / 12 * 360 + 90;
  const minuteDegree = now.getMinutes() / 60 * 360 + 90;
  const secondDegree = now.getSeconds() / 60 * 360 + 90;

  hourHand.style.transform = `rotate(${hourDegree}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
  secondHand.style.transform = `rotate(${secondDegree}deg)`;
}

setInterval(updateTime, 1000);
updateTime();