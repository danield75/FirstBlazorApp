let canvas, context;
let drawing = false;
let lastX = 0, lastY = 0;

window.startDrawing = (x, y) => {
    canvas = document.getElementById('drawCanvas');
    context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = 'black';

    drawing = true;
    lastX = x - canvas.offsetLeft;
    lastY = y - canvas.offsetTop;
};

window.stopDrawing = () => {
    drawing = false;
};

window.draw = (x, y) => {
    if (!drawing) return;

    let currentX = x - canvas.offsetLeft;
    let currentY = y - canvas.offsetTop;

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(currentX, currentY);
    context.stroke();

    lastX = currentX;
    lastY = currentY;
};
