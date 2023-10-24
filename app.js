
let name;

// Запитуємо ім'я, якщо воно відсутнє
if (!name) {
  name = prompt('Введіть ваше ім\'я:');
}

// Виводимо ім'я на сторінку
const usernameEl = document.getElementById('username');
usernameEl.textContent = `Ім'я: ${name}`;

let attempts = 0;

// Отримуємо елементи 
const slotMachineEl = document.getElementById('slot-machine');
const attemptEl = document.getElementById('attempt');

// Функція генерації випадкового числа
function getRandomNum() {
  return Math.floor(Math.random() * 5) + 1;
}

// Функція генерації матриці 
function generateMatrix() {
  const matrix = [];
  
  for(let i = 0; i < 3; i++) {
    const row = [];
    
    for(let j = 0; j < 3; j++) {
      row.push(getRandomNum());  
    }

    matrix.push(row);
  }

  return matrix;
}

// Функція перевірки перемоги
function checkWin(matrix) {
  for(let i = 0; i < 3; i++) {
    if(matrix[i][0] === matrix[i][1] && 
       matrix[i][1] === matrix[i][2]) {
      return true;
    }
  }
  return false;
}

// Функція відображення матриці
function displayMatrix(matrix) {
  slotMachineEl.innerHTML = '';
  
  matrix.forEach(row => {
     row.forEach(num => {
       const slotEl = document.createElement('div');
       slotEl.className = 'slot';
       const imgEl = document.createElement('img');
       imgEl.src = `images/${num}.png`;
       imgEl.alt = `Image ${num}`;
       slotEl.appendChild(imgEl);
       slotMachineEl.appendChild(slotEl);
     }); 
  });
}

// Повідомлення про перемогу
function showWin() {
  alert('Вітаю, ви виграли!');
  attempts = 0;
  attemptEl.textContent = ''; // Очищаємо відображення спроб
}

// Повідомлення про програш
function showLoss() {
  alert('На жаль, спроби закінчились. Зіграймо ще раз?!');
  attempts = 0;
  attemptEl.textContent = ''; // Очищаємо відображення спроб
}

// Генерація спроби
function generateAttempt() {
  attempts++;
  attemptEl.textContent = `Спроба ${attempts} з 3`;

  const matrix = generateMatrix();
  displayMatrix(matrix);

  if (checkWin(matrix)) {
    showWin();
  } else if (attempts === 3) {
    showLoss(); 
  }
}