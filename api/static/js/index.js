document.addEventListener('DOMContentLoaded', function() {
    var body = document.querySelector('body');
    var inputContainer = document.querySelector('.form-group');
    var themeButton = document.querySelector('.switch-theme');
    var themeButtonIcon = document.querySelector('.switch-theme__icon');

    themeButton.addEventListener('click', function() {
        body.classList.toggle('darkmode')
        themeButtonIcon.classList.add('animated');

        if (body.classList.contains('darkmode')) {
            themeButtonIcon.classList.remove('fa-sun');
            themeButtonIcon.classList.add('fa-moon');
        } else {
            themeButtonIcon.classList.remove('fa-moon');
            themeButtonIcon.classList.add('fa-sun');
        }

        setTimeout( () => {
            themeButtonIcon.classList.remove('animated');
        }, 500)
    });

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
});
