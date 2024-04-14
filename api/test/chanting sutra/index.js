document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.getElementById('wordsInput');
    const sutratypingArea = document.querySelector('.sutra-typing-area');
    const wordsArea = document.getElementById('words');
    const outOfFocusArea = document.getElementById('not-focusing');
    const words = 'radal urmoder babushka wotdefok holeesh gta sanandreas cj sosig fat'.split(' ');
    const wordsCount = words.length;
    const lastTyped = [];

    function randomWord() {
        const randomIndex = Math.ceil(Math.random() * wordsCount);
        return words[randomIndex - 1];
    }

    function formatWord(word) {
        return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
    }

    function newGame() {
        document.getElementById('words').innerHTML = '';
        for (let i = 0; i < 50; i++) {
            document.getElementById('words').innerHTML += formatWord(randomWord());
        }
        document.querySelector('.word').classList.add('current');
    }

    function checkIfFocusedInput() {
        if (inputBox !== document.activeElement) {
            inputBox.focus();
        }
    }

    inputBox.addEventListener('keydown', e => { // WARN: Incredibly buggy now.
        const currentWord = document.querySelector('.word.current');
        const currentLetters = currentWord.getElementsByTagName('span');
        const isFirstLetter = currentLetters[inputBox.value.length - 1] === currentWord.firstChild;
        if (e.key === ' ') {
            if (inputBox.value) {
                lastTyped.push(inputBox.value);
            } else {
                lastTyped.push('');
            }
            inputBox.value = '';
            const lettersToInvalidate = [...document.querySelectorAll('.word.current span:not(.correct)')];
            lettersToInvalidate.forEach(letter => {
                letter.classList.add('incorrect');
            });
            currentWord.classList.remove('current')
            currentWord.nextSibling.classList.add('current');
            e.preventDefault();
        } else if (e.key === 'Backspace') {
            if (currentLetters[inputBox.value.length-1] && isFirstLetter) {
                if (currentWord != currentWord.parentNode.firstElementChild) {
                    currentWord.classList.remove('current');
                    currentWord.previousSibling.classList.add('current');
                }
                currentLetters[inputBox.value.length - 1].classList.remove('incorrect');
                currentLetters[inputBox.value.length - 1].classList.remove('correct');
                inputBox.value = lastTyped[lastTyped.length - 1] || '';
                lastTyped.pop();
            }
            if (currentLetters[inputBox.value.length-1] && !isFirstLetter) {
                currentLetters[inputBox.value.length - 1].classList.remove('incorrect');
                currentLetters[inputBox.value.length - 1].classList.remove('correct');
            }
            if (!currentLetters[inputBox.value.length-1]) {
                if (currentWord != currentWord.parentNode.firstElementChild) {
                    currentWord.classList.remove('current');
                    currentWord.previousSibling.classList.add('current');
                }
                inputBox.value = lastTyped[lastTyped.length - 1] || '';
                lastTyped.pop();
                e.preventDefault();
            }
        }
    });

    inputBox.addEventListener('input', e => {
        const value = e.target.value;
        const currentWord = document.querySelector('.word.current');
        const currentLetters = currentWord.getElementsByTagName('span');
        for (var i = 0; i < value.length; i++) {
            if (i >= currentLetters.length) {
                var incorrectLetter = document.createElement('span');
                incorrectLetter.innerHTML = value[i];
                incorrectLetter.className = 'letter incorrect extra';
                currentWord.appendChild(incorrectLetter);
            } else if (currentLetters[i] && currentLetters[i].textContent === value[i]) {
                currentLetters[i].classList.add('correct');
            } else {
                currentLetters[i].classList.add('incorrect');
            }
        }
    });

    newGame();

    sutratypingArea.addEventListener('click', () => { // TODO: Add press any key to focus
        checkIfFocusedInput();
    });

    inputBox.addEventListener('focus', () => { // TODO: change inputBox's event to function, then add them to here for better focus.
        document.removeEventListener('keydown', checkIfFocusedInput);
        wordsArea.style.transition = "0s";
        wordsArea.classList.add('focus');
        outOfFocusArea.classList.add('focus');
    });

    inputBox.addEventListener('focusout', () => {
        document.addEventListener('keydown', checkIfFocusedInput);
        setTimeout(function() {
            wordsArea.style.transition = "0.25s";
            wordsArea.classList.remove('focus');
            outOfFocusArea.classList.remove('focus');
        }, 1000);
    });
});
