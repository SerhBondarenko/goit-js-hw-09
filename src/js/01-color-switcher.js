


const body = document.querySelector('body')
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener("click", () => {
timerId = setInterval(() => {
   body.style.backgroundColor = getRandomHexColor()
}, 1000);
    
startBtn.setAttribute('disabled', 'disabled');
console.log('Кнопка не активна')
});


stopBtn.addEventListener("click", () => {
    startBtn.removeAttribute('disabled');
    console.log('Кнопка активна')
  clearInterval(timerId);
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
