document.addEventListener("DOMContentLoaded", function () {
  var body = document.querySelector("body");

  var inputContainer = document.querySelector(".form-group");

  var prayButton = document.querySelector(".switch-pray");
  var prayButtonIcon = document.querySelector(".switch-pray__icon");
  var prayButtonIndicator = document.querySelector(".switch-pray__indicator");
  var themeButton = document.querySelector(".switch-theme");
  var themeButtonIcon = document.querySelector(".switch-theme__icon");

  var scoreForm = document.getElementById("form");

  var prayContainer = document.querySelector(".pray-container");

  function loadTheme() {
    const darkmode = localStorage.getItem("darkmode");

    if (!darkmode) {
      localStorage.setItem("darkmode", false);
      themeButtonIcon.classList.add("fa-sun");
    } else if (darkmode == "true") {
      body.classList.add("darkmode");
      themeButtonIcon.classList.remove("fa-sun");
      themeButtonIcon.classList.add("fa-moon");
    } else if (darkmode == "false") {
      themeButtonIcon.classList.remove("fa-moon");
      themeButtonIcon.classList.add("fa-sun");
    }
  }

  function loadPray() {
    const praymode = localStorage.getItem("praymode");

    if (!praymode) {
      localStorage.setItem("praymode", false);
      prayButtonIcon.classList.add("fa-power-off");
      prayButtonIndicator.classList.remove("animated");
    } else if (praymode == "true") {
      body.classList.add("praymode");
      prayButtonIcon.classList.remove("fa-power-off");
      prayButtonIcon.classList.add("fa-hands-praying");
      prayButtonIndicator.classList.add("animated");
    } else if (praymode == "false") {
      prayButtonIcon.classList.remove("fa-hands-praying");
      prayButtonIcon.classList.add("fa-power-off");
      prayButtonIndicator.classList.remove("animated");
    }
  }

  loadTheme();

  themeButton.addEventListener("click", function () {
    body.classList.toggle("darkmode");
    themeButtonIcon.classList.remove("animated");
    themeButtonIcon.classList.add("animated");

    if (body.classList.contains("darkmode")) {
      themeButtonIcon.classList.remove("fa-sun");
      themeButtonIcon.classList.add("fa-moon");
      localStorage.setItem("darkmode", true);
    } else {
      themeButtonIcon.classList.remove("fa-moon");
      themeButtonIcon.classList.add("fa-sun");
      localStorage.setItem("darkmode", false);
    }

    setTimeout(() => {
      themeButtonIcon.classList.remove("animated");
    }, 500);
  });

  loadPray();

  prayButton.addEventListener("click", function () {
    var prayToggled = localStorage.getItem("praymode");

    if (prayToggled == "false") {
      prayButtonIcon.classList.remove("fa-power-off");
      prayButtonIcon.classList.add("fa-hands-praying");
      prayButtonIndicator.classList.add("animated");
      localStorage.setItem("praymode", true);
    } else {
      prayButtonIcon.classList.remove("fa-hands-praying");
      prayButtonIcon.classList.add("fa-power-off");
      prayButtonIndicator.classList.remove("animated");
      localStorage.setItem("praymode", false);
    }
  });

  // Input

  inputContainer.addEventListener("input", function (event) {
    var target = event.target;
    if (target.tagName === "INPUT") {
      validate(target);
    }
  });

  function validate(inputElement) {
    var inputValue = inputElement.value;

    if (inputValue.length > 3) {
      if (inputValue % 1 === 0) {
        inputElement.value = inputValue.substring(0, 3);
      } else {
        inputElement.value = Math.round(inputValue * 10) / 10;
      }
    } else if (inputValue > 100) {
      inputElement.value = 100;
    } else if (inputValue < 0) {
      inputElement.value = 0;
    }
  }

  scoreForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var prayToggled = localStorage.getItem("praymode");

    if (prayToggled == "false") {
      this.submit();
    } else {
      prayContainer.style.animation = "zoom 1s forwards";
      woodenFishGameBtn = document.getElementById("wooden-fish-gamebtn");
      charmPaperGameBtn = document.getElementById("charm-paper-gamebtn");

      woodenFishGameBtn.addEventListener("click", function woodenTrigger() {
        var woodenFishClickArea = document.getElementById("woodenFishClickArea");
        var woodenFish = document.querySelector(".woodenFish")
        var woodenFishStart = document.querySelector(".woodenFishStart")
        var woodenFishStick = document.querySelector(".woodenFishStick")
        var audioUrl = document.getElementById('audioContainer').dataset.audioUrl;
        woodenFishGameBtn.style.display = "none";
        charmPaperGameBtn.style.display = "none";
        woodenFishGameBtn.removeEventListener("click", woodenTrigger)
        woodenFishClickArea.style.display = '';

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function punya() {
            var rn = getRandomInt(1, 6);
            if (rn === 1) {
                var span = document.createElement('span');
                span.textContent = '功德+1';

                woodenFish.appendChild(span);

                span.tabIndex = -1;
                span.style.zIndex = 10;
                span.style.animation = 'showandfall 2s forwards';
                span.style.fontSize = '10px';
                // Don't change, a mess
                span.style.top = getRandomInt(0, 100).toString() + 'px';
                span.style.left = getRandomInt(0, 250).toString() + 'px';

                span.addEventListener('animationend', function() {
                    span.remove();
                });
            }
        }

        woodenFishStart.addEventListener('click', () => {
            woodenFishStart.style.display = 'none';
            woodenFishStart.removeEventListener('click', arguments.callee);
            console.log('始める!');

            var clickCount = 0;
            function fishClicked() {
                woodenFishStick.classList.remove('animated');
                woodenFishStick.classList.add('animated');

                punya();

                new Audio(audioUrl).play();
                clickCount++;

                animationTimeout = setTimeout( () => {
                    woodenFishStick.classList.remove('animated');
                }, 100)
            }
            woodenFish.addEventListener('click', fishClicked);
            woodenFish.click();

            //var timeleft = 1;
            //var downloadTimer = setInterval(function() {
            //    if (timeleft === 10) {
            //        fish.removeEventListener('click', fishClicked);
            //        clearInterval(downloadTimer);
            //        var cps = clickCount/10;
            //        console.log(cps);
            //    }
            //    timeleft++;
            //}, 1000);
        });
      });

      charmPaperGameBtn.addEventListener("click", function charmTrigger() {
        woodenFishGameBtn.style.display = "none";
        charmPaperGameBtn.style.display = "none";
        charmPaperGameBtn.removeEventListener("click", charmTrigger)
      });
    }
  });
});
