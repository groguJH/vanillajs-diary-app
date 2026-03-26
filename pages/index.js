const writeDiary = document.getElementById("writeDiary");
const diaryLists = document.getElementById("diaryLists");
const calender = document.getElementById("calender");
const iframe = document.getElementById("content-frame");
const wisdomAuthor = document.getElementById("author");
const wisdomMessage = document.getElementById("message");
const home = document.getElementById("home");
const themeToggle = document.getElementById("theme-toggle");
const switchText = document.getElementById("switch-text");
const mouseAnimation = document.querySelector(".followMouseAnimation");

let latestX = 0;
let latestY = 0;
let ticking = false;

function syncIframeTheme() {
  if (!iframe.contentDocument) {
    return;
  }

  const currentTheme = document.documentElement.getAttribute("data-theme");
  iframe.contentDocument.documentElement.setAttribute("data-theme", currentTheme);
}

function toggleTheme(event) {
  const isDarkMode = event.target.checked === true;
  const nextTheme = isDarkMode ? "dark-mode" : "light-mode";

  document.documentElement.setAttribute("data-theme", nextTheme);
  syncIframeTheme();
  switchText.innerText = isDarkMode ? " 다크모드 off" : " 다크모드 on";
}

function updateCursor() {
  mouseAnimation.style.left = `${latestX}px`;
  mouseAnimation.style.top = `${latestY}px`;
  ticking = false;
}

function onMouseMove(event) {
  latestX = event.clientX;
  latestY = event.clientY;

  if (!ticking) {
    requestAnimationFrame(updateCursor);
    ticking = true;
  }
}

function changePage(pagePath) {
  iframe.setAttribute("src", pagePath);
}

async function wiseSayingFn() {
  try {
    const response = await fetch("https://korean-advice-open-api.vercel.app/api/advice");
    const result = await response.json();

    wisdomAuthor.textContent = result.author;
    wisdomMessage.textContent = result.message;
  } catch (error) {
    console.error("명언을 불러오는 중 오류가 발생했습니다.", error);
  }
}

themeToggle.addEventListener("change", toggleTheme);
document.addEventListener("mousemove", onMouseMove);

iframe.addEventListener("load", () => {
  syncIframeTheme();

  try {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    iframeDocument.addEventListener("mousemove", (event) => {
      const rect = iframe.getBoundingClientRect();
      latestX = event.clientX + rect.left;
      latestY = event.clientY + rect.top;

      if (!ticking) {
        requestAnimationFrame(updateCursor);
        ticking = true;
      }
    });
  } catch (error) {
    console.error("iframe 이벤트 등록 오류:", error);
  }
});

writeDiary.addEventListener("click", () => {
  changePage("./pages/writeDiary.html");
});

diaryLists.addEventListener("click", () => {
  changePage("./pages/diaryLists.html");
});

calender.addEventListener("click", () => {
  changePage("./pages/calender.html");
});

home.addEventListener("click", () => {
  changePage("./pages/home.html");
});

wiseSayingFn();
