const tbody = document.querySelector(".container-main-cal-body");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector("#close");
const saveModal = document.getElementById("save");
const monthDisplay = document.getElementById("nav-btn-month");
const inputArea = document.getElementById("inputContent");
const content = document.getElementById("content");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const goTodayButton = document.getElementById("go-today");

let day = new Date();
let year = day.getFullYear();
let month = day.getMonth() + 1;
let selectedDate = "";

function formatDate(y, m, d) {
  const monthFormat = m < 10 ? `0${m}` : `${m}`;
  const dayFormat = d < 10 ? `0${d}` : `${d}`;
  return `${y}-${monthFormat}-${dayFormat}`;
}

function renderDiaryContent(savedData) {
  if (!savedData) {
    content.textContent = "일기를 적어보세요";
    return;
  }

  const diaryFormat = [
    savedData.date || "",
    savedData.title || "",
    savedData.mood || "",
    savedData.content || "",
  ]
    .filter(Boolean)
    .join("\n");

  content.textContent = diaryFormat || "일기를 적어보세요";
}

function renderCalendar() {
  const currentDate = new Date();
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0).getDate();
  const startDay = firstDay.getDay();

  let currentDay = 1;
  tbody.innerHTML = "";

  for (let row = 0; row < 6; row += 1) {
    const trElement = document.createElement("tr");

    for (let column = 0; column < 7; column += 1) {
      const cellIndex = row * 7 + column;
      const tdElement = document.createElement("td");

      if (cellIndex < startDay || currentDay > lastDay) {
        tdElement.textContent = "";
      } else {
        tdElement.textContent = currentDay;

        if (
          currentDay === currentDate.getDate() &&
          month === currentDate.getMonth() + 1 &&
          year === currentDate.getFullYear()
        ) {
          tdElement.classList.add("today");
        }

        setSelectDateEvent(tdElement, currentDay);
        currentDay += 1;
      }

      trElement.appendChild(tdElement);
    }

    tbody.appendChild(trElement);
  }
}

function updateMonthDisplay() {
  monthDisplay.innerText = ` ${year}년 ${month}월 `;
}

function prevMonth() {
  month -= 1;

  if (month < 1) {
    month = 12;
    year -= 1;
  }

  updateMonthDisplay();
  renderCalendar();
}

function nextMonth() {
  month += 1;

  if (month > 12) {
    month = 1;
    year += 1;
  }

  updateMonthDisplay();
  renderCalendar();
}

function goToday() {
  day = new Date();
  year = day.getFullYear();
  month = day.getMonth() + 1;
  updateMonthDisplay();
  renderCalendar();
}

function setSelectDateEvent(tdElement, dayNumber) {
  tdElement.addEventListener("click", (event) => {
    tbody.querySelectorAll("td").forEach((cell) => {
      cell.classList.remove("selected");
    });

    inputArea.value = "";
    event.currentTarget.classList.add("selected");
    modal.style.display = "flex";

    selectedDate = formatDate(year, month, dayNumber);
    getSavedInputData(selectedDate);
  });
}

function getSavedInputData(dateKey) {
  const savedData = JSON.parse(localStorage.getItem(dateKey));
  renderDiaryContent(savedData);
}

function handleInputEnter(event) {
  if (event.key === "Enter" && inputArea.value.trim() !== "") {
    setSaveInputData();
    inputArea.value = "";
  }
}

function setSaveInputData() {
  const inputValue = inputArea.value.trim();

  if (inputValue === "") {
    return;
  }

  const savedData = JSON.parse(localStorage.getItem(selectedDate)) || {};
  const nextDiary = { ...savedData, content: inputValue };

  localStorage.setItem(selectedDate, JSON.stringify(nextDiary));
  renderDiaryContent(nextDiary);
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

saveModal.addEventListener("click", setSaveInputData);
inputArea.addEventListener("keydown", handleInputEnter);
prevMonthButton.addEventListener("click", prevMonth);
nextMonthButton.addEventListener("click", nextMonth);
goTodayButton.addEventListener("click", goToday);

renderCalendar();
updateMonthDisplay();
