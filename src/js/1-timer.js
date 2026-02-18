
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let timerId = null;
const btn = document.querySelector(".timer-btn");
const inp = document.querySelector("#datetime-picker");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");


btn.disabled = true;
inp.disabled = false;

flatpickr(inp, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future",
        position: "topRight",
      });
      btn.disabled = true;
    } else {
      btn.disabled = false; 
    }
  },
});


btn.addEventListener("click", () => {
  if (!userSelectedDate) return;

  btn.disabled = true;
  inp.disabled = true;

  timerId = setInterval(() => {
    const ms = userSelectedDate - new Date();

    if (ms <= 0) {
      clearInterval(timerId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      inp.disabled = false;
      btn.disabled = false;
      return;
    }

    updateTimer(convertMs(ms));
  }, 1000);
});


function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
