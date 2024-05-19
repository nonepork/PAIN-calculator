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
        var woodenFishClickArea = document.getElementById(
          "woodenFishClickArea",
        );
        var woodenFish = document.querySelector(".woodenFish");
        var woodenFishStart = document.querySelector(".woodenFishStart");
        var woodenFishStick = document.querySelector(".woodenFishStick");
        var audioUrl =
          document.getElementById("audioContainer").dataset.audioUrl;
        var introductionText = document.getElementById("fishIntroduction");
        woodenFishGameBtn.style.display = "none";
        charmPaperGameBtn.style.display = "none";
        woodenFishGameBtn.removeEventListener("click", woodenTrigger);
        woodenFishClickArea.style.display = "";

        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function punya() {
          var rn = getRandomInt(1, 6);
          if (rn === 1) {
            var span = document.createElement("span");
            span.textContent = "功德+1";

            woodenFish.appendChild(span);

            span.tabIndex = -1;
            span.style.zIndex = 10;
            span.style.animation = "showandfall 2s forwards";
            span.style.fontSize = "10px";
            // Don't change, a mess
            span.style.top = getRandomInt(0, 100).toString() + "px";
            span.style.left = getRandomInt(0, 250).toString() + "px";

            span.addEventListener("animationend", function () {
              span.remove();
            });
          }
        }

        woodenFishStart.addEventListener("click", () => {
          woodenFishStart.style.display = "none";
          woodenFishStart.removeEventListener("click", arguments.callee);
          introductionText.style.display = "none";
          console.log("始める!");

          var clickCount = 0;
          function fishClicked() {
            woodenFishStick.classList.remove("animated");
            woodenFishStick.classList.add("animated");

            punya();

            new Audio(audioUrl).play();
            clickCount++;

            animationTimeout = setTimeout(() => {
              woodenFishStick.classList.remove("animated");
            }, 100);
          }
          woodenFish.addEventListener("click", fishClicked);
          woodenFish.click();

          var timeleft = 1;
          var downloadTimer = setInterval(function () {
            if (timeleft === 10) {
              woodenFish.removeEventListener("click", fishClicked);
              woodenFish.style.cursor = "unset";
              woodenFish.style.filter = "grayscale(1)";
              woodenFishStick.style.filter = "grayscale(1)";

              clearInterval(downloadTimer);
              var cps = clickCount / 10;
              console.log(cps);
            }
            timeleft++;
          }, 1000);
        });
      });

      charmPaperGameBtn.addEventListener("click", function charmTrigger() {
        var charmPaperDrawingArea = document.querySelector(
          ".charmPaperDrawingArea",
        );
        var charmCanvas = document.getElementById("charm_paper");
        var clearButton = document.getElementById("clear_canvas");
        var undoButton = document.getElementById("undo_canvas");
        var pensizeSlider = document.querySelector(".pen_size");
        var colorPicker = document.querySelector(".color_picker");
        woodenFishGameBtn.style.display = "none";
        charmPaperGameBtn.style.display = "none";
        charmPaperGameBtn.removeEventListener("click", charmTrigger);
        charmPaperDrawingArea.style.display = "";

        charmCanvas.width = 290;
        charmCanvas.height = charmPaperDrawingArea.clientHeight - 130;

        // Drawing

        let context = charmCanvas.getContext("2d");
        context.fillStyle = "#F6E28C";
        context.fillRect(0, 0, charmCanvas.width, charmCanvas.height);

        let draw_color = "black";
        // let opacity = '0.8';  TODO: Figure out a way to do this.
        let draw_width = "2";
        let is_drawing = false;

        let restore_array = [];
        let index = -1;

        charmCanvas.addEventListener("touchstart", start, false);
        charmCanvas.addEventListener("touchmove", draw, false);
        charmCanvas.addEventListener("mousedown", start, false);
        charmCanvas.addEventListener("mousemove", draw, false);

        charmCanvas.addEventListener("touchend", stop, false);
        charmCanvas.addEventListener("mouseup", stop, false);
        charmCanvas.addEventListener("mouseout", stop, false);

        function start(event) {
          is_drawing = true;
          context.beginPath();
          context.moveTo(event.offsetX, event.offsetY);
          event.preventDefault();
        }

        function draw(event) {
          if (is_drawing) {
            let x =
              event.offsetX ||
              event.touches[0].clientX -
                charmCanvas.getBoundingClientRect().left;
            let y =
              event.offsetY ||
              event.touches[0].clientY -
                charmCanvas.getBoundingClientRect().top;
            context.lineTo(x, y);
            context.strokeStyle = draw_color;
            context.lineWidth = draw_width;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
          }
          event.preventDefault();
        }

        function stop(event) {
          if (is_drawing) {
            context.stroke();
            context.closePath();
            is_drawing = false;
          }
          event.preventDefault();

          if (event.type != "mouseout") {
            restore_array.push(
              context.getImageData(0, 0, charmCanvas.width, charmCanvas.height),
            );
            index++;
          }
        }

        function clear_canvas() {
          context.fillStyle = "#F6E28C";
          context.clearRect(0, 0, charmCanvas.width, charmCanvas.height);
          context.fillRect(0, 0, charmCanvas.width, charmCanvas.height);

          restore_array = [];
          index = -1;
        }

        function undo_canvas() {
          if (index <= 0) {
            clear_canvas();
          } else {
            index--;
            restore_array.pop();
            context.putImageData(restore_array[index], 0, 0);
          }
        }

        clearButton.addEventListener("click", clear_canvas);
        undoButton.addEventListener("click", undo_canvas);
        pensizeSlider.addEventListener("input", function () {
          draw_width = this.value;
        });
        colorPicker.addEventListener("input", function () {
          draw_color = this.value;
        });
      });
    }
  });
});
