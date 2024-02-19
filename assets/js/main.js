(function(){
   "use strict";
 
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
 
  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }
 
  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }
 
 })();
 
  /**
   * Class Timer
   */
 
  let timerInterval;
  let seconds = 0;
  let minutes = 0;
  let isTimerRunning = false;

  function toggleTimer() {
    if (!isTimerRunning) {
      startTimer();
    } else {
      pauseTimer();
    }
  }

  function startTimer() {
    // Enable all checkboxes
    enableCheckboxes(true);

    document.getElementById("toggle-icon").classList.remove("bi-play-fill");
    document.getElementById("toggle-icon").classList.add("bi-pause-fill");
    isTimerRunning = true;
    document.getElementById("restart").disabled = false;
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 30) {
      pauseTimer();
    }
    const formattedTime = pad(minutes) + ':' + pad(seconds);
    document.getElementById("timer").textContent = formattedTime;
  }

  function pauseTimer() {
    // Disable all checkboxes
    enableCheckboxes(false);

    document.getElementById("toggle-icon").classList.remove("bi-pause-fill");
    document.getElementById("toggle-icon").classList.add("bi-play-fill");
    isTimerRunning = false;
    clearInterval(timerInterval);
  }

  function restartTimer() {
    // Disable all checkboxes
    enableCheckboxes(false);

    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    document.getElementById("timer").textContent = "00:00";
    document.getElementById("toggle-icon").classList.remove("bi-pause-fill");
    document.getElementById("toggle-icon").classList.add("bi-play-fill");
    isTimerRunning = false;
    document.getElementById("restart").disabled = true;
  }

  function pad(value) {
    return (value < 10) ? "0" + value : value;
  }

  function enableCheckboxes(enable) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.disabled = !enable;
    });
  }
