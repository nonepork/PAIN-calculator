document.addEventListener('DOMContentLoaded', function() {
    var container = document.querySelector('.container');
    var charmCanvas = document.getElementById('charm_paper');
    var clearButton = document.getElementById('clear_canvas');
    var undoButton = document.getElementById('undo_canvas');
    var pensizeSlider = document.querySelector('.pen_size');
    var colorPicker = document.querySelector('.color_picker');
    charmCanvas.width = 290;
    charmCanvas.height = container.clientHeight - 130;

    // Drawing

    let context = charmCanvas.getContext('2d');
    context.fillStyle = '#F6E28C';
    context.fillRect(0, 0, charmCanvas.width, charmCanvas.height);

    let draw_color = 'black';
    // let opacity = '0.8';  TODO: Figure out a way to do this.
    let draw_width = '2';
    let is_drawing = false;

    let restore_array = [];
    let index = -1;

    charmCanvas.addEventListener('touchstart', start, false);
    charmCanvas.addEventListener('touchmove', draw, false);
    charmCanvas.addEventListener('mousedown', start, false);
    charmCanvas.addEventListener('mousemove', draw, false);

    charmCanvas.addEventListener('touchend', stop, false);
    charmCanvas.addEventListener('mouseup', stop, false);
    charmCanvas.addEventListener('mouseout', stop, false);

    function start(event) {
        is_drawing = true;
        context.beginPath();
        context.moveTo(event.offsetX, event.offsetY);
        event.preventDefault();
    }

    function draw(event) {
        if (is_drawing) {
            let x = event.offsetX || event.touches[0].clientX - charmCanvas.getBoundingClientRect().left;
            let y = event.offsetY || event.touches[0].clientY - charmCanvas.getBoundingClientRect().top;
            context.lineTo(x, y);
            context.strokeStyle = draw_color;
            context.lineWidth = draw_width;
            context.lineCap = 'round';
            context.lineJoin = 'round';
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

        if (event.type != 'mouseout') {
            restore_array.push(context.getImageData(0, 0, charmCanvas.width, charmCanvas.height))
            index++;
        }
    }

    function clear_canvas() {
        context.fillStyle = '#F6E28C';
        context.clearRect(0, 0, charmCanvas.width, charmCanvas.height);
        context.fillRect(0, 0, charmCanvas.width, charmCanvas.height);

        restore_array = []
        index = -1;
    }

    function undo_canvas () {
        if (index <= 0) {
            clear_canvas();
        } else {
            index--;
            restore_array.pop()
            context.putImageData(restore_array[index], 0, 0);
        }
    }

    clearButton.addEventListener('click', clear_canvas);
    undoButton.addEventListener('click', undo_canvas);
    pensizeSlider.addEventListener('input', function() {
        draw_width = this.value;
    });
    colorPicker.addEventListener('input', function() {
        draw_color = this.value;
    });
});
