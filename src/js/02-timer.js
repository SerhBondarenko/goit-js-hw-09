// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
// all modules
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startInput: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    fields: document.querySelectorAll('.field'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
};

const body = document.querySelector('body')
refs.timer.classList.add('timer-styles');
body.style.backgroundColor = "#abbaab";

const currentDate = Date.now();
let dateElClock = null;
let intervalId = null;
refs.startBtn.disabled = true;
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    
      dateElClock= selectedDates[0]; 
      if (dateElClock > currentDate) {
        refs.startBtn.disabled = false;
      
      } else {
       Notify.failure("Please choose a date in the future");
    }}
  };
const flatpickrEl  = new flatpickr(refs.startInput, options);

refs.startBtn.addEventListener('click',updateClockRun);

function updateClockRun() {
  
    intervalId =  setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = dateElClock - currentDate;
    refs.days.textContent = convertMs(deltaTime).days;
    refs.hours.textContent = convertMs(deltaTime).hours;
    refs.minutes.textContent = convertMs(deltaTime).minutes;
    refs.seconds.textContent = convertMs(deltaTime).seconds;
    refs.startBtn.disabled = true;
       flatpickrEl.input.setAttribute("disabled", "disabled")
       if (deltaTime < 1000) {
     clearInterval(intervalId);
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
  refs.startInput.disabled = false;
    }  
     }, 1000);
}

function  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
  return { days, hours, minutes, seconds };
 
}
function pad(value) {
  return String(value).padStart(2, "0");
}

/*Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.*/
/*console.log(currentDate)
console.log(refs.startInput);
console.log(refs.startBtn);
console.log(refs.timer);
console.log(refs.fields);
console.log(refs.days);
console.log(refs.hours);
console.log(refs.minutes);
console.log(refs.seconds);*/
