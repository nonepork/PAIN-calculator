document.addEventListener('DOMContentLoaded', function() {
    var body = document.querySelector('body');

    var inputContainer = document.querySelector('.form-group');

    var prayButton = document.querySelector('.switch-pray');
    var prayButtonIcon = document.querySelector('.switch-pray__icon');
    var prayButtonIndicator = document.querySelector('.switch-pray__indicator');
    var themeButton = document.querySelector('.switch-theme');
    var themeButtonIcon = document.querySelector('.switch-theme__icon');

    var scoreForm = document.getElementById("form");

    var prayContainer = document.querySelector('.pray-container');

    function loadTheme() {
        const darkmode = localStorage.getItem('darkmode');

        if (!darkmode) {
            localStorage.setItem('darkmode', false);
            themeButtonIcon.classList.add('fa-sun');
        } else if (darkmode == 'true') {
            body.classList.add('darkmode');
            themeButtonIcon.classList.remove('fa-sun');
            themeButtonIcon.classList.add('fa-moon');
        } else if (darkmode == 'false') {
            themeButtonIcon.classList.remove('fa-moon');
            themeButtonIcon.classList.add('fa-sun');
        }
    }

    function loadPray() {
        const praymode = localStorage.getItem('praymode');

        if (!praymode) {
            localStorage.setItem('praymode', false);
            prayButtonIcon.classList.add('fa-power-off');
            prayButtonIndicator.classList.remove('animated');
        } else if (praymode == 'true') {
            body.classList.add('praymode');
            prayButtonIcon.classList.remove('fa-power-off');
            prayButtonIcon.classList.add('fa-hands-praying');
            prayButtonIndicator.classList.add('animated');
        } else if (praymode == 'false') {
            prayButtonIcon.classList.remove('fa-hands-praying');
            prayButtonIcon.classList.add('fa-power-off');
            prayButtonIndicator.classList.remove('animated');
        }
    }

    loadTheme();

    themeButton.addEventListener('click', function() {
        body.classList.toggle('darkmode')
        themeButtonIcon.classList.remove('animated');
        themeButtonIcon.classList.add('animated');

        if (body.classList.contains('darkmode')) {
            themeButtonIcon.classList.remove('fa-sun');
            themeButtonIcon.classList.add('fa-moon');
            localStorage.setItem('darkmode', true);
        } else {
            themeButtonIcon.classList.remove('fa-moon');
            themeButtonIcon.classList.add('fa-sun');
            localStorage.setItem('darkmode', false);
        }

        setTimeout( () => {
            themeButtonIcon.classList.remove('animated');
        }, 500)
    });

    loadPray()

    prayButton.addEventListener('click', function() {
        var prayToggled = localStorage.getItem('praymode');

        if (prayToggled == 'false') {
            prayButtonIcon.classList.remove('fa-power-off');
            prayButtonIcon.classList.add('fa-hands-praying');
            prayButtonIndicator.classList.add('animated');
            localStorage.setItem('praymode', true);
        } else {
            prayButtonIcon.classList.remove('fa-hands-praying');
            prayButtonIcon.classList.add('fa-power-off');
            prayButtonIndicator.classList.remove('animated');
            localStorage.setItem('praymode', false);
        }
    });

    // Input

    inputContainer.addEventListener('input', function(event) {
        var target = event.target;
        if (target.tagName === 'INPUT') {
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

    scoreForm.addEventListener('submit', function(event) {
        event.preventDefault()

        var prayToggled = localStorage.getItem('praymode');

        if (prayToggled == 'false') {
            this.submit();
        } else {
            prayContainer.style.animation = 'zoom 1s forwards';
        }
    });
});
