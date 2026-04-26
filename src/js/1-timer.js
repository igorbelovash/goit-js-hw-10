import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");

const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");

startBtn.addEventListener("click", handleStart);

startBtn.disabled = true;

let userSelectedDate = null;
let intervalId = null;

flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentTime = Date.now();

        userSelectedDate = selectedDates[0].getTime();
        if (userSelectedDate <= currentTime) {
            iziToast.show({
                message: 'Please choose a date in the future',
                messageColor: '#FFFFFF',
                messageSize: '16px',
                messageLineHeight: '150%',
                color: '#EF4040',
            });
            startBtn.disabled = true;
            return;
        }

        startBtn.disabled = false;
    },
});

function handleStart() {
    startBtn.disabled = true;
    datetimePicker.disabled = true;

    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate - currentTime;
        
        if (deltaTime <= 0) {
            clearInterval(intervalId);
            datetimePicker.disabled = false;
            return;
        }

        const objTime = convertMs(deltaTime);
        dataDays.textContent = objTime.days.toString().padStart(2, '0');
        dataHours.textContent = objTime.hours.toString().padStart(2, '0');
        dataMinutes.textContent = objTime.minutes.toString().padStart(2, '0');
        dataSeconds.textContent = objTime.seconds.toString().padStart(2, '0');
        
    }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


