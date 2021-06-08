import {default as Timer, range} from './timer-util.js';
import  './howler.js';

const form = document.querySelector('#timer');
const hours = form.querySelector('#hours');
const minutes = form.querySelector('#minutes');
const seconds = form.querySelector('#seconds');
const text = form.querySelector('#time');

hours.addEventListener('change', () => {
    checkInput(hours, 0, 999);
});
minutes.addEventListener('change', () => {
    checkInput(minutes, 0, 59);
});
seconds.addEventListener('change', () => {
    checkInput(seconds, 0, 59);
});

const btnStart = form.querySelector('#btnStart');
const btnStop = form.querySelector('#btnStop');

let begin = false;
let pause = false;
const timer = new Timer();

btnStart.addEventListener('click', () => {
    const settings = {
        cbUpdate: updateTime,
        cbStop: stopTimer
    };
    // При первом запуске добавляем время таймера
    if (!begin) {
        settings.hours = hours.valueAsNumber,
        settings.minutes = minutes.valueAsNumber,
        settings.seconds = seconds.valueAsNumber
    }
    if (pause) {
        btnStart.textContent = 'Продолжить';
        timer.stop();
        pause = false;
    } else {
        btnStart.textContent = 'Пауза';
        pause = true;
        timer.start(settings);
        begin = true;
    }
});

btnStop.addEventListener('click' , () => {
    timer.stop();
    clearTimer();
})

function checkInput(input, min, max) {
    input.value = range(input.valueAsNumber, min, max);
}

function updateTime({hour, minute, second}) {
    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'decimal',
        minimumIntegerDigits: 2,
    })
    text.textContent = `${hour}:${formatter.format(minute)}:${formatter.format(second)}`;
}

function clearTimer() {
    begin = false;
    text.textContent = '0:00:00';
    btnStart.textContent = 'Старт';
    pause = false;
}

function stopTimer() {
    const sound = new Howl({
        src: ['sound/alarm.mp3'],
    });
   sound.play();
   clearTimer();
}