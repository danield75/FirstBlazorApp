let canvas, context;
let drawing = false;
let lastX = 0, lastY = 0;
let brushWidth = 2; // Default brush width

window.setBrushWidth = (width) => {
    brushWidth = width;
};

window.startDrawing = (x, y) => {
    canvas = document.getElementById('drawCanvas');
    context = canvas.getContext('2d');
    context.lineWidth = brushWidth;
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
    context.lineWidth = brushWidth; // Use the dynamic brush width
    context.stroke();

    lastX = currentX;
    lastY = currentY;
};

window.calculateUsedPercentage = () => {
    let canvas = document.getElementById('drawCanvas');
    let context = canvas.getContext('2d');
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let totalPixels = imageData.width * imageData.height;
    let drawnPixels = 0;

    // Pixel data is in the form of [r, g, b, a, r, g, b, a, ...]
    for (let i = 0; i < imageData.data.length; i += 4) {
        let r = imageData.data[i];     // Red
        let g = imageData.data[i + 1]; // Green
        let b = imageData.data[i + 2]; // Blue
        let a = imageData.data[i + 3]; // Alpha

        // We assume the background is white (255, 255, 255, 255).
        // If the pixel is not white, we consider it a "drawn" pixel.
        if (!(r === 255 && g === 255 && b === 255 && a === 255)) {
            drawnPixels++;
        }
    }

    // Calculate the percentage of drawn pixels
    let percentage = (drawnPixels / totalPixels) * 100;
    return percentage;
};
