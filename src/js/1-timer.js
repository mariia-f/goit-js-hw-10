import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate = "";
const btn = document.querySelector(".timer-btn");
const inp = document.querySelector(".input") 
inp.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0]
      if (userSelectedDate < new Date()) {
       iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    
    btn.disabled = true;
   
}
else {
    btn.disabled = false;
    inp.disabled = false; 
}
  },
};

flatpickr("#datetime-picker", options)

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


btn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  btn.disabled = true;
  inp.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const ms = userSelectedDate - now;

    if (ms <= 0) {
      clearInterval(timerId);

      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      inp.disabled = false; // після завершення таймера можна обирати нову дату
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(ms);

    daysEl.textContent = days;
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

  }, 1000);
});