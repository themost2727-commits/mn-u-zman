const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const sizeSlider = document.getElementById('size-slider');
const tools = document.querySelectorAll('.tool');
const undoBtn = document.getElementById('undo-btn');

let isDrawing = false;
let currentTool = 'pen';
let history = []; // بۆ گەڕانەوە (Undo)

// ڕێکخستنی قەبارەی شاشەکە بەپێی ئامێرەکە
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    // باکگراوندی سپی
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// دەستپێکردنی وێنەکێشان
function startPosition(e) {
    isDrawing = true;
    saveState(); // سەیڤکردنی هەنگاوێک بۆ Undo
    draw(e);
}

// وەستانی وێنەکێشان
function endPosition() {
    isDrawing = false;
    ctx.beginPath();
}

// کرداری وێنەکێشان
function draw(e) {
    if (!isDrawing) return;
    e.preventDefault(); // ڕێگری لە جووڵەی شاشە دەکات

    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;

    // ڕێکخستنی شوێنی وێنەکێشانەکە بەپێی نوارەی سەرەوە
    const rect = canvas.getBoundingClientRect();
    x = x - rect.left;
    y = y - rect.top;

    ctx.lineWidth = sizeSlider.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (currentTool === 'eraser') {
        ctx.strokeStyle = '#ffffff'; // ڕەنگی سپی بۆ سڕینەوە
    } else if (currentTool === 'marker') {
        ctx.strokeStyle = colorPicker.value;
        ctx.globalAlpha = 0.5; // کاڵکردنەوەی مارکەر
    } else {
        ctx.strokeStyle = colorPicker.value;
        ctx.globalAlpha = 1.0;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// بەستنەوەی کۆدەکان بە ماوس و پەنجەوە
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startPosition, {passive: false});
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw, {passive: false});

// گۆڕینی ئامرازەکان
tools.forEach(tool => {
    tool.addEventListener('click', () => {
        tools.forEach(t => t.classList.remove('active'));
        tool.classList.add('active');
        currentTool = tool.getAttribute('data-tool');
        ctx.globalAlpha = 1.0; // گەڕاندنەوەی ڕووناکی ئاسایی
    });
});

// گەڕانەوە (Undo)
function saveState() {
    history.push(canvas.toDataURL());
    if (history.length > 10) history.shift(); // تەنها ١٠ هەنگاو سەیڤ دەکات
}

undoBtn.addEventListener('click', () => {
    if (history.length > 0) {
        let imgData = history.pop();
        let img = new Image();
        img.src = imgData;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
});
