const text = `«Навіть не рипайся!» «У тебе нічого не вийде!» «Інші не досягли, і ти не зможеш!» 
 
Кожен із нас чув внутрішні голоси, які промовляють ці чи подібні фрази й не дозволяють нам отримати те, про що ми мріємо. Найчастіше ми їх слухаємося й відступаємо. Відкладаємо свою мрію і життя в довгий ящик. А потім, коли життя добігає кінця, страшенно жалкуємо про це, однак уже пізно… Але що, коли їх — страхів-тигрів — можна позбутися?  
 
Книга Джима Ловлесса — бізнес-тренера, одного з найпопулярніших європейських мотиваційних спікерів — саме про те, як здолати свого внутрішнього тигра. Серед його клієнтів — такі всесвітньо відомі компанії, як Apple, British Telecom, Barclays Bank і навіть Національна служба охорони здоров’я Великобританії. `;

// трансформація стірнги у масив 
const normalizedText = text.replace(/\n+/g, "\n\n");
const paragraphs = normalizedText.split("\n\n");

// JavaScript код для вставки даних про книгу
const bookData = {
  title: "Іди туди, де Страшно",
  cover: "./img/book.jpg",
  description: paragraphs,
  author: "Джим Лоулесс",
  attributes: [
    "Жанр: Cаморозвиток/психологія",
    "Рік випуску: 2022",
    "Кількість сторінок: 320",
  ],
};

// Розділіть опис на абзаци і вставте їх
const descriptionParagraph = document.querySelector("div#book-exposition");
console.log(descriptionParagraph);

bookData?.description?.forEach((paragraph) => {
  const paragraphElement = document.createElement("p");
  paragraphElement.style.marginTop = "10px";
  paragraphElement.textContent = paragraph;
  descriptionParagraph.appendChild(paragraphElement);
});

document.querySelector("h1").textContent = bookData.title;
document.querySelector("img#book-cover").src = bookData.cover;
document.querySelector("a#author-link").textContent = bookData.author;
document.querySelector("ul#book-attributes").innerHTML = bookData.attributes
  .map((attribute) => `<li>${attribute}</li>`)
  .join("");

// JavaScript код для розгортання/згортання опису книги
const readMoreButton = document.querySelector("#read-more");
const bookDescription = document.querySelector("div#book-exposition");

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

    const commentItem = document.createElement("li");
    commentItem.style.marginTop = "10px";
    commentItem.innerHTML = `${authorName}: <br> ${commentText}</p>`;
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
  }, 500);
};



function year() {
  try {
    const year = document.querySelector("#year");
    year.textContent = new Date().getFullYear();
    console.log(year);
  } catch {
    console.log(error);
  }
}
year();
