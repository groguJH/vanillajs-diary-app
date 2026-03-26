const homeImage = document.getElementById("image-canvas");
const canvas = document.getElementById("drawing");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 300;

async function loadImage() {
  try {
    const response = await fetch("/api/searchImg");

    if (!response.ok) {
      throw new Error("이미지 요청에 실패했습니다.");
    }

    const data = await response.json();

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = data.imageUrl;

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  } catch (error) {
    console.error("이미지를 불러오는 중 오류 발생:", error);
    homeImage.textContent = "이미지를 불러올 수 없어요.";
    return;
  }
}

let painting = false;

function startPosition(event) {
  painting = true;
  draw(event);
}

function endPosition() {
  painting = false;
  ctx.beginPath();
}

function draw(event) {
  if (!painting) {
    return;
  }

  ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth = 30;
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(0,0,0,1)";
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

loadImage();
