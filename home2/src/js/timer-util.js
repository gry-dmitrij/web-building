function range(value, min = -Infinity, max = Infinity) {
    if (!Number.isFinite(value))
        throw('Неверное значение');
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

function safeCall(call, ...args) {
    if (typeof call === 'function') {
        call(...args);
    }
}

class Timer {
    constructor() {
        this._startTime = 0;
        this._timerId = null;
        this._hours = 0;
        this._minutes = 0;
        this._seconds = 0;
        this._msInterval = 0;
    }
    start({cbUpdate, cbStop, hours, minutes, seconds}) {
        if (hours || hours === 0) this._hours = range(hours, 0, 999);
        if (minutes || minutes === 0) this._minutes = range(minutes, 0, 59);
        if (seconds || seconds === 0) this._seconds = range(seconds, 0, 59);
        this._msInterval = this._seconds * 1000
            + this._minutes * 60 * 1000
            + this._hours * 60 * 60 * 1000
            + 1000;
        this._startTime = new Date().getTime();
        this._time = {
            hour: this._hours,
            minute: this._minutes,
            second: this._seconds
        }
        safeCall(cbUpdate, this._time);
        const tickFunction = this._tick.bind(this);
        if (!this._timerId) this._timerId = setInterval(tickFunction, 100, cbUpdate, cbStop);
        // if (!this._timerId) this._timerId = setTimeout(tickFunction, 100, cbUpdate, cbStop);
    };

    stop() {
        if (this._timerId) {
            clearInterval(this._timerId);
            this._timerId = null;
            this._hours = this._time.hour;
            this._minutes = this._time.minute;
            this._seconds = this._time.second;
        }
    }

    _tick(cbUpdate, cbStop) {
        let time = new Date().getTime() - this._startTime;
        time = time > this._msInterval ? 0 : this._msInterval - time;

        const hour = Math.trunc(time / 3600000);
        const minute = Math.trunc(time / 60000) % 60;
        const second = Math.trunc(time / 1000) % 60;

        if (this._time.second !== second
            || this._time.minute !== minute
            || this._time.hour !== hour) {
            this._time.second = second;
            this._time.minute = minute;
            this._time.second = second;
            safeCall(cbUpdate, this._time);
        }

        if (time === 0) {
            this.stop();
            safeCall(cbStop);
        }
    }
}

export {Timer as default, range};