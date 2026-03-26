const homeImage = document.getElementById("image-canvas");
const canvas = document.getElementById("drawing");
const ctx = canvas.getContext("2d");
const accessKey = import.meta.env.VITE_UNSPLASH_API_KEY;

canvas.width = 500;
canvas.height = 300;

async function loadImage() {
  if (!accessKey) {
    homeImage.textContent = "이미지를 불러올 수 없어요.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}`
    );
    const data = await response.json();
    const image = new Image();

    image.crossOrigin = "anonymous";
    image.src = data.urls.regular;

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  } catch (error) {
    console.error("이미지를 불러오는 중 오류 발생:", error);
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
