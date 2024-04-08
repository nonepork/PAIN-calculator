document.addEventListener('DOMContentLoaded', function() {
    const words = 'radal urmoder babushka wotdefok holeesh gta sanandreas cj sosig fat'.split(' ');
    const wordsCount = words.length;

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
        document.querySelector('.letter').classList.add('current');
    }

    document.querySelector('.sutra-typing-area').addEventListener('keydown', ev => {// TODO: change this to detect using wordsInput like monkeytype
        const key = ev.key;
        const currentWord = document.querySelector('.word.current');
        const currentLetter = document.querySelector('.letter.current');
        const expected = currentLetter?.innerHTML || ' ';
        const isLetter = key.length === 1 && key !== ' ';
        const isSpace = key === ' ';
        const isBackspace = key === 'Backspace';
        const isFirstLetter = currentLetter === currentWord.firstChild;
        const parentDiv = document.querySelector('.sutra-typing-area');

        // key handling

        if (isLetter) {
            if (currentLetter) {
                currentLetter.classList.add(key === expected ? 'correct' : 'incorrect')
                currentLetter.classList.remove('current');
                if (currentLetter.nextSibling) {
                    currentLetter.nextSibling.classList.add('current');
                }
            } else {
                const incorrectLetter = document.createElement('span');
                incorrectLetter.innerHTML = key;
                incorrectLetter.className = 'letter extra';
                currentWord.appendChild(incorrectLetter);
            }
        }

        if (isSpace) {
            if (expected !== ' ') {
                const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
                lettersToInvalidate.forEach(letter => {
                    letter.classList.add('incorrect');
                });
            }
            currentWord.classList.remove('current');
            currentWord.nextSibling.classList.add('current');
            if (currentLetter) {
                currentLetter.classList.remove('current');
            }
            currentWord.nextSibling.firstChild.classList.add('current');
        }

        if (isBackspace) {
            if (currentLetter && isFirstLetter) {
                currentWord.classList.remove('current');
                currentWord.previousSibling.classList.add('current');
                currentLetter.classList.remove('current');
                currentWord.previousSibling.lastChild.classList.add('current');
                currentWord.previousSibling.lastChild.classList.remove('incorrect');
                currentWord.previousSibling.lastChild.classList.remove('correct');
            }
            if (currentLetter && !isFirstLetter) { 
                currentLetter.classList.remove('current');
                currentLetter.previousSibling.classList.add('current');
                currentLetter.previousSibling.classList.remove('incorrect');
                currentLetter.previousSibling.classList.remove('correct');
            }
            if (!currentLetter) {
                if (currentWord.lastChild.classList.contains('extra')) {
                    currentWord.lastChild.remove();
                } else {
                    currentWord.lastChild.classList.add('current');
                    currentWord.lastChild.classList.remove('incorrect');
                    currentWord.lastChild.classList.remove('correct');
                }
            }
        }

        // scroll lines

        if (currentWord.getBoundingClientRect().left - parentDiv.getBoundingClientRect().left < 200) {
            const words = document.getElementById('words');
            words.style.marginRight = '-45px'; // TODO: yeah
        }

        // move cursor

        // TODO: fix this mess
        const nextLetter = document.querySelector('.letter.current');
        const nextWord = document.querySelector('.word.current');
        const cursor = document.getElementById('cursor');
        cursor.style.opacity = 1;
        // cursor.style.animationPlayState = 'paused';
        if (nextLetter) {
            cursor.style.top = nextLetter.getBoundingClientRect().top - 105 + 'px';
            cursor.style.left = nextLetter.getBoundingClientRect().left - parentDiv.getBoundingClientRect().left + 122 + 'px';
        } else {
            cursor.style.top = nextWord.getBoundingClientRect().bottom - 100 + 'px';
            cursor.style.left = nextWord.getBoundingClientRect().left - parentDiv.getBoundingClientRect().left + 127 + 'px';
        }
        // cursor.style.animationPlayState = 'running';
    });

    newGame();

    const nextLetter = document.querySelector('.letter.current');
    const cursor = document.getElementById('cursor');
    cursor.style.top = nextLetter.getBoundingClientRect().top - 110 + 'px';
});
