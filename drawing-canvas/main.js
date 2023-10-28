const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const context = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener("click", (event) => {
  if (event.target.id === "clear") {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
});

toolbar.addEventListener("change", (event) => {
  if (event.target.id === "stroke") {
    context.strokeStyle = event.target.value;
  }

  if (event.target.id === "lineWidth") {
    lineWidth = event.target.value;
  }
});

const draw = (event) => {
  if (!isPainting) {
    return;
  }

  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineTo(event.clientX - canvasOffsetX, event.clientY);
  context.stroke();
};

canvas.addEventListener("mousedown", (event) => {
  isPainting = true;
  startX = event.clientX;
  startY = event.clientY;
});

canvas.addEventListener("mouseup", (event) => {
  isPainting = false;
  context.stroke();
  context.beginPath();
});

canvas.addEventListener("mousemove", draw);
