const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const closeButton = document.getElementById("close-button");

function openModal(content) {
  modalText.textContent = content;
  modal.style.display = "flex";
}

function closeModalFn() {
  modal.style.display = "none";
}

function formatDate(date = new Date()) {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthFormat = month < 10 ? `0${month}` : `${month}`;
  const dayFormat = day < 10 ? `0${day}` : `${day}`;

  return `${year}-${monthFormat}-${dayFormat}`;
}

function getSortedKey() {
  const today = formatDate(new Date());
  const listArray = [];

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);

    if (key && key.length > 0 && key.indexOf("-") !== -1 && key <= today) {
      listArray.push(key);
    }
  }

  listArray.sort((a, b) => b.localeCompare(a));
  return listArray;
}

function renderListFn() {
  const diaryListUl = document.getElementById("diaryList");
  const sortedKeys = getSortedKey();

  diaryListUl.textContent = "";

  sortedKeys.forEach((key) => {
    const diaryContent = JSON.parse(localStorage.getItem(key));
    const date = diaryContent.date || " ";
    const title = diaryContent.title || " ";
    const mood = diaryContent.mood || " ";
    const content = diaryContent.content || " ";
    const diaryItem = document.createElement("li");

    diaryItem.textContent = `${date}  ${title} ${mood} ${content} `;
    diaryItem.addEventListener("click", () => {
      openModal(`${date}\n${title}\n${mood}\n${content}`);
    });
    diaryListUl.append(diaryItem);
  });
}

closeButton.addEventListener("click", closeModalFn);

renderListFn();
