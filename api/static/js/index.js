document.addEventListener("DOMContentLoaded", function() {
    var inputContainer = document.querySelector(".form-group");

    inputContainer.addEventListener("input", function(event) {
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
});
