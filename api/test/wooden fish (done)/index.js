document.addEventListener('DOMContentLoaded', function() {
    var stick = document.querySelector('.stick');
    var fish = document.querySelector('.wooden_fish');
    var startfish = document.querySelector('.start');

    startfish.addEventListener('click', () => {
        startfish.style.display = 'none';
        startfish.removeEventListener('click', arguments.callee);
        console.log('始める!');

        var clickCount = 0;
        function fishClicked() {
            stick.classList.remove('animated');
            stick.classList.add('animated');

            new Audio('wooden fish sound.mp3').play();
            clickCount++;

            setTimeout( () => {
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
