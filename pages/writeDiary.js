const title = document.getElementById("title");
const dateCalender = document.getElementById("date-calender");
const mood = document.getElementById("mood");
const contentBox = document.getElementById("content-box");
const buttonSubmit = document.getElementById("buttonSubmit");

let storageDiaryWritten = {};

function saveLocalStorage() {
  if (!dateCalender.value) {
    return;
  }

  localStorage.setItem(dateCalender.value, JSON.stringify(storageDiaryWritten));
}

function updateDiaryData() {
  storageDiaryWritten = {
    title: title.value.trim(),
    date: dateCalender.value,
    mood: mood.value,
    content: contentBox.value.trim(),
  };
}

function writeDiaryFn() {
  title.addEventListener("change", () => {
    updateDiaryData();
    saveLocalStorage();
  });

  dateCalender.addEventListener("input", () => {
    updateDiaryData();
    saveLocalStorage();
  });

  mood.addEventListener("input", () => {
    updateDiaryData();
    saveLocalStorage();
  });

  contentBox.addEventListener("change", () => {
    updateDiaryData();
    saveLocalStorage();
  });
}

buttonSubmit.addEventListener("click", () => {
  updateDiaryData();
  saveLocalStorage();
  window.location.href = "./diaryLists.html";
});

writeDiaryFn();
