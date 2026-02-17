let userSelectedDate = "";
let timerId;

const btn = document.querySelector(".timer-btn");
const inp = document.querySelector("#datetime-picker");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  },
};

flatpickr(inp, options);

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

      inp.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(ms);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

  }, 1000);
});