document.addEventListener('DOMContentLoaded', function() {
    var stick = document.querySelector('.stick');
    var fish = document.querySelector('.wooden_fish');
    var startfish = document.querySelector('.start');

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

            fish.appendChild(span);

            span.tabIndex = -1;
            span.style.animation = 'showandfall 2s forwards';
            span.style.top = getRandomInt(0, 582).toString() + 'px';
            span.style.left = getRandomInt(0, 600).toString() + 'px';

            span.addEventListener('animationend', function() {
                span.remove();
            });
        }
    }

    startfish.addEventListener('click', () => {
        startfish.style.display = 'none';
        startfish.removeEventListener('click', arguments.callee);
        console.log('始める!');

        var clickCount = 0;
        function fishClicked() {
            stick.classList.remove('animated');
            stick.classList.add('animated');

            punya();

            new Audio('wooden fish sound.mp3').play();
            clickCount++;

            animationTimeout = setTimeout( () => {
                stick.classList.remove('animated');
            }, 100)
        }
        fish.addEventListener('click', fishClicked);
        fish.click();

        var timeleft = 1;
        var downloadTimer = setInterval(function() {
            if (timeleft === 10) {
                fish.removeEventListener('click', fishClicked);
                clearInterval(downloadTimer);
                var cps = clickCount/10;
                console.log(cps);
            }
            timeleft++;
        }, 1000);
    });
});
