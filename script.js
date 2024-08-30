let timer;
let isRunning = false;
let workMinutes = 25;
let breakMinutes = 5;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const notificationSound = document.getElementById('notification-sound');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('set-time').addEventListener('click', setCustomTime);
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(runTimer, 1000);
        if (isWorkTime) {
            alert("Work timer started!"); 
            notificationSound.play(); 
        } else {
            alert("Break timer started!"); 
            notificationSound.play(); 
        }
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    updateDisplay(workMinutes, 0);
    isWorkTime = true;
    notificationSound.stop(); 
    notificationSound.currentTime = 0; 
}

function runTimer() {
    let minutes = parseInt(minutesDisplay.textContent);
    let seconds = parseInt(secondsDisplay.textContent);

    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            toggleWorkBreak();
            if (isWorkTime) {
                alert("Break time!");
            } else {
                alert("Work time!"); 
            }
            notificationSound.play();
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }

    updateDisplay(minutes, seconds);
}

function updateDisplay(minutes, seconds) {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function setCustomTime() {
    workMinutes = parseInt(document.getElementById('work-time').value);
    breakMinutes = parseInt(document.getElementById('break-time').value);
    resetTimer();
}

function toggleWorkBreak() {
    isWorkTime = !isWorkTime;
    if (isWorkTime) {
        updateDisplay(workMinutes, 0);
        notificationSound.pause(); 
        notificationSound.currentTime = 0; 
    } else {
        updateDisplay(breakMinutes, 0);
        notificationSound.play(); 
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

document.querySelector('.add-task').addEventListener('click', function() {
    let taskInput = document.querySelector('#task-list input[type="text"]');
    if (taskInput.value.trim() !== "") {
        let li = document.createElement('li');
        li.innerHTML = `${taskInput.value} <button class="delete-task">Delete</button>`;
        document.getElementById('task-list').appendChild(li);
        taskInput.value = "";
    }
});

document.getElementById('task-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-task')) {
        e.target.parentElement.remove();
    }
});
