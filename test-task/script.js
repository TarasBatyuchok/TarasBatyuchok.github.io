const text = `Книга Джима Ловлесса — бізнес-тренера, одного з найпопулярніших європейських мотиваційних спікерів — саме
про те, як подолати свій страх, незалежно від того, чого саме ви боїтеся: пірнути на глибину, піти на
співбесіду чи освідчитися в коханні. Десять правил, запропоновані автором у книзі, дадуть вам змогу прогнати
внутрішніх тигрів і зробити крок уперед, а відтак знайти внутрішню силу для будь-яких звершень.`;

// JavaScript код для вставки даних про книгу
const bookData = {
  title: "Іди туди, де Страшно",
  cover: "./img/book.jpg",
  description: text,
  author: "Джим Лоулесс",
  attributes: [
    "Жанр: Cаморозвиток/психологія",
    "Рік випуску: 2022",
    "Кількість сторінок: 320",
  ],
};

// Розділіть опис на абзаци і вставте їх

document.querySelector("h1").textContent = bookData.title;
document.querySelector("img#book-cover").src = bookData.cover;
document.querySelector("a#author-link").textContent = bookData.author;
document.querySelector("p#book-exposition").textContent = bookData.description;
document.querySelector("ul#book-attributes").innerHTML = bookData.attributes
  .map((attribute) => `<li>${attribute}</li>`)
  .join("");

// JavaScript код для розгортання/згортання опису книги
const readMoreButton = document.querySelector("#read-more");
const bookDescription = document.querySelector("p#book-exposition");

readMoreButton.addEventListener("click", function () {
  if (
    bookDescription.style.display === "none" ||
    bookDescription.style.display === ""
  ) {
    bookDescription.style.display = "block";
    readMoreButton.textContent = "Згорнути";
  } else {
    bookDescription.style.display = "none";
    readMoreButton.textContent = "Опис книги";
  }
});

// JavaScript код для роботи з коментарями
const commentForm = document.querySelector("#comment-form");
const commentList = document.querySelector("#comment-list");

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const authorName = document.querySelector("#author-name").value;
  const commentText = document.querySelector("#comment-text").value;

  if (authorName && commentText) {
    const currentTime = new Date();
    const commentTime = `${currentTime.getDate()}.${
      currentTime.getMonth() + 1
    }.${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}`;

    const commentItem = document.createElement("li");
    commentItem.style.marginTop = "10px";
    commentItem.innerHTML = `<p>${commentTime} <br> ${authorName}: <br> ${commentText}</p>`;
    commentList.appendChild(commentItem);

    // Очистити поля вводу
    document.querySelector("#author-name").value = "";
    document.querySelector("#comment-text").value = "";
  }
});

// laoder
document.body.onload = function () {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (!preloader.classList.contains("done")) {
      preloader.classList.add("done");
    }
  }, 1500);
};
