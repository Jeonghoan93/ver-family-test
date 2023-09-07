let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let points = [];
let isDragging = false;
let draggingPointIndex;

canvas.addEventListener("mousedown", function (event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  for (let i = 0; i < points.length; i++) {
    if (isPointClicked(points[i], x, y)) {
      isDragging = true;
      draggingPointIndex = i;
      return;
    }
  }

  if (points.length < 3) {
    points.push({ x, y });
    drawShapes();
  }
});

canvas.addEventListener("mousemove", function (event) {
  if (isDragging) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    points[draggingPointIndex].x = x;
    points[draggingPointIndex].y = y;

    drawShapes(); // Redraw everything
  }
});

canvas.addEventListener("mouseup", function (event) {
  isDragging = false;
});

function isPointClicked(point, mouseX, mouseY) {
  return Math.sqrt((point.x - mouseX) ** 2 + (point.y - mouseY) ** 2) <= 5.5;
}

function drawShapes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let point of points) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5.5, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  if (points.length === 3) {
    let dx = points[2].x - points[1].x;
    let dy = points[2].y - points[1].y;
    let fourthPoint = { x: points[0].x + dx, y: points[0].y + dy };

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.lineTo(fourthPoint.x, fourthPoint.y);
    ctx.closePath();
    ctx.stroke();

    let base = Math.sqrt(dx * dx + dy * dy);
    let height =
      Math.abs(
        points[0].x * (points[1].y - points[2].y) +
          points[1].x * (points[2].y - points[0].y) +
          points[2].x * (points[0].y - points[1].y)
      ) / base;
    let area = base * height;

    let r = Math.sqrt(area / Math.PI);
    let centerX = (points[0].x + points[1].x + points[2].x) / 3;
    let centerY = (points[0].y + points[1].y + points[2].y) / 3;

    ctx.strokeStyle = "yellow";
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
    ctx.stroke();

    document.getElementById(
      "point1"
    ).textContent = `Point 1: (${points[0].x.toFixed(2)}, ${points[0].y.toFixed(
      2
    )})`;
    document.getElementById(
      "point2"
    ).textContent = `Point 2: (${points[1].x.toFixed(2)}, ${points[1].y.toFixed(
      2
    )})`;
    document.getElementById(
      "point3"
    ).textContent = `Point 3: (${points[2].x.toFixed(2)}, ${points[2].y.toFixed(
      2
    )})`;
    document.getElementById("area").textContent = area.toFixed(2);
  }
}

function resetCanvas() {
  points = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("point1").textContent = "Point 1: (---, ---)";
  document.getElementById("point2").textContent = "Point 2: (---, ---)";
  document.getElementById("point3").textContent = "Point 3: (---, ---)";
  document.getElementById("area").textContent = "---";
}

function showAbout() {
  alert(
    "Select three points to draw a parallelogram and a circle. then click one of the points to move it."
  );
}

document.querySelector("#resetButton").addEventListener("click", resetCanvas);
document.querySelector("#aboutButton").addEventListener("click", showAbout);
