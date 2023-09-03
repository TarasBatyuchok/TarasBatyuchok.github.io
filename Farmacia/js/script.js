("use strict");
const burger = document.querySelector(".burger"),
   // menu = document.querySelector(".menu"),
   header = document.querySelector(".header"),
   headerAction = document.querySelector(".header-action"),
   headerAside1 = document.querySelector(".header-aside_1"),
   headerAside2 = document.querySelector(".header-aside_2"),
   headerAside3 = document.querySelector(".header-aside_3"),
   headerAside4 = document.querySelector(".header-aside_4"),
   body = document.querySelector("body");

if (document.querySelector(".swiper")) {
   const swiperCss = document.createElement("link");
   swiperCss.setAttribute("rel", "stylesheet");
   swiperCss.setAttribute("href", "./css/swiper-bundle.min.css");
   swiperScript = document.createElement("script");
   swiperScript.setAttribute("src", "js/swiper-bundle.min.js");
   document.querySelector("head").prepend(swiperCss);
   body.append(swiperScript);
}

window.addEventListener("load", () => {
   function qs(element) {
      let newEl = document.querySelector(element);
      if (newEl) return newEl;
   }
   function qa(element) {
      let newEl = document.querySelectorAll(element);
      if (newEl) return newEl;
   }

   if (burger) {
      body.addEventListener("click", burgerToggle);
      function burgerToggle(e) {
         if (e.target.closest(".burger")) {
            if (burger.classList.contains("active")) {
               burger.classList.remove("active");
               header.classList.remove("active");
               headerAction.classList.remove("active");
               body.classList.remove("lock");
               headerAside1.classList.remove("active");
               headerAside2.classList.remove("active");
            } else {
               burger.classList.add("active");
               header.classList.add("active");
               headerAction.classList.add("active");
               headerAside1.classList.add("active");
               body.classList.add("lock");
               window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
            }
         } else if (e.target.closest("#menu-shop")) {
            headerAside1.classList.remove("active");
            headerAside2.classList.add("active");
         } else if (e.target.closest("#menu-information")) {
            headerAside1.classList.remove("active");
            headerAside3.classList.add("active");
         } else if (e.target.closest("#menu-profile")) {
            e.preventDefault();
            headerAside1.classList.remove("active");
            headerAside4.classList.add("active");
         } else if (e.target.closest(".header-aside__top")) {
            e.preventDefault();
            headerAside1.classList.add("active");
            headerAside2.classList.remove("active");
            headerAside3.classList.remove("active");
            headerAside4.classList.remove("active");
         } else if (!e.target.closest(".burger")) {
            // burger.classList.remove("active");
            // header.classList.remove("active");
            // headerAction.classList.remove("active");
            // body.classList.remove("lock");
            // window.removeEventListener("scroll", closeBurger);
         }
      }
      // menu-information
      function closeBurger() {
         if (burger.classList.contains("active")) {
            //Необязательная дополнительная проверка
            burger.classList.remove("active");
            menu.classList.remove("active");
            header.classList.remove("active");
            body.classList.remove("lock");
            window.removeEventListener("scroll", closeBurger);
         }
      }
   }

   // ! Quiz starts
   body.addEventListener("click", quiz);

   function quiz(e) {
      let steps = qa(".quiz__step");
      let backButton = qs(".quiz__footer > div");

      if (e.target.closest(".quiz__footer > div")) {
         qs(".quiz").classList.remove("active");
         qs(".quiz__pages").innerHTML = "1/9";
         body.classList.remove("lock");
         steps.forEach((el) => {
            el.classList.remove("active");
         });
      } else if (e.target.closest(".quiz__step")) {
         if (e.target.closest(".quiz__step_1 .quiz__circle")) {
            steps[0].classList.remove("active");
            steps[1].classList.add("active");
            qs(".quiz__pages").innerHTML = "2/9";
         } else if (e.target.closest(".quiz__step_2 .quiz__question p")) {
            steps[1].classList.remove("active");
            steps[2].classList.add("active");
            qs(".quiz__pages").innerHTML = "3/9";
         } else if (e.target.closest(".quiz__step_3 .quiz__question p")) {
            steps[2].classList.remove("active");
            steps[3].classList.add("active");
            qs(".quiz__pages").innerHTML = "4/9";
         } else if (e.target.closest(".quiz__step_4 .quiz__question p")) {
            steps[3].classList.remove("active");
            steps[4].classList.add("active");
            qs(".quiz__pages").innerHTML = "5/9";
         } else if (e.target.closest(".quiz__step_5 .quiz__question p")) {
            steps[4].classList.remove("active");
            steps[5].classList.add("active");
            qs(".quiz__pages").innerHTML = "6/9";
         } else if (e.target.closest(".quiz__step_6 .quiz__question p")) {
            steps[5].classList.remove("active");
            steps[6].classList.add("active");
            qs(".quiz__pages").innerHTML = "7/9";
         } else if (e.target.closest(".quiz__step_7 .quiz__question p")) {
            steps[6].classList.remove("active");
            steps[7].classList.add("active");
            qs(".quiz__pages").innerHTML = "8/9";
         } else if (e.target.closest(".quiz__step_8 .quiz__question p")) {
            steps[7].classList.remove("active");
            steps[8].classList.add("active");
            qs(".quiz__pages").innerHTML = "9/9";
         } else if (e.target.closest(".quiz__step_9 .quiz__circle")) {
            location.href = "personal-pack.html";
            setTimeout(() => {
               steps[8].classList.remove("active");
               qs(".quiz").classList.remove("active");
               qs(".quiz__pages").innerHTML = "1/9";
               body.classList.remove("lock");
            }, 3000);
         }
      }
      if (e.target.innerHTML == "Take the quiz") {
         qs(".quiz").classList.add("active");
         steps[0].classList.add("active");
         body.classList.add("lock");
      }
   }

   body.addEventListener("mousedown", borderAdd);

   function borderAdd(e) {
      if (e.target.closest(".quiz__question p")) {
         e.target.classList.add("active");
         body.addEventListener("mouseup", borderRemove);
         function borderRemove(e) {
            qa(".quiz__question p").forEach((el) => {
               el.classList.remove("active");
            });
         }
      }
   }
   // Quiz end =============================================================================================================================

   //Sign-up.html
   if (qs("body.sign-up")) {
      const leftButton = qs(".left-btn"),
         rightButton = qs(".right-btn"),
         lastButton = qs(".last-button"),
         wholesaleInput = qs(".wholesale-input"),
         wholesaleHeading = qs(".wholesale-heading");

      body.addEventListener("click", switchClasses);

      function switchClasses(e) {
         if (e.target.closest(".left-btn")) {
            if (leftButton.classList.contains("disabled")) {
               leftButton.classList.remove("disabled");
               lastButton.classList.remove("disabled");
               rightButton.classList.add("disabled");
               wholesaleInput.classList.add("disabled");
               wholesaleHeading.classList.add("disabled");
            }
         } else if (e.target.closest(".right-btn")) {
            if (rightButton.classList.contains("disabled")) {
               leftButton.classList.add("disabled");
               lastButton.classList.add("disabled");
               rightButton.classList.remove("disabled");
               wholesaleInput.classList.remove("disabled");
               wholesaleHeading.classList.remove("disabled");
               const inputs = qa("input");
               if (inputs[0].value && inputs[1].value && inputs[2].value && inputs[3].value && inputs[4].value) {
                  lastButton.classList.remove("disabled");
               }
            }
         } else if (e.target.closest(".icons-row__item")) {
            body.classList.add("hide-content");
            lastButton.classList.add("disabled");
            wholesaleInput.firstElementChild.setAttribute("value", "");
            wholesaleInput.classList.remove("disabled");
            wholesaleInput.addEventListener("change", () => {
               lastButton.classList.remove("disabled");
            });
         }
      }

      if (window.innerWidth > 1441) {
         wholesaleInput.firstElementChild.setAttribute("placeholder", "Wholesale purchase permission");
      }
   }
   //Catalog.html
   if (qs("body.catalog")) {
      // Slider banners
      const swiperBanner = new Swiper(".banner__slider", {
         // loop: true,
         // centeredSlides: false,
         slideToClickedSlide: true,
         slidesPerView: 1,
         spaceBetween: 15,
         navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
         },
         pagination: {
            el: ".swiper-pagination",
            clickable: true,
         },
         breakpoints: {
            376: {
               slidesPerView: 1.2,
            },
            400: {
               slidesPerView: 1.3,
               spaceBetween: 20,
            },
            450: {
               slidesPerView: 1.4,
            },
            500: {
               // centeredSlides: true,
               slidesPerView: 1.5,
            },
            550: {
               slidesPerView: 1.6,
            },
            600: {
               slidesPerView: 1.8,
            },
            650: {
               slidesPerView: 1.9,
            },
            700: {
               slidesPerView: 2,
            },
            750: {
               slidesPerView: 2.1,
            },
            800: {
               slidesPerView: 2.2,
            },
            850: {
               slidesPerView: 2.3,
            },
            900: {
               slidesPerView: 2.4,
            },
            950: {
               slidesPerView: 2.5,
            },
            1000: {
               centeredSlides: true,
               initialSlide: 0,
               loop: true,
               slidesPerView: 1.12,
               spaceBetween: 30,
            },
            1400: {
               centeredSlides: true,
               slidesPerView: 1.28,
               spaceBetween: 50,
            },
         },
      });
      // Slider comments
      const swiperComments = new Swiper(".comments__slider", {
         initialSlide: 0,
         slideToClickedSlide: true,
         slidesPerView: 1.07,
         spaceBetween: 10,
         breakpoints: {
            380: {
               slidesPerView: 1.06,
            },
            400: {
               slidesPerView: 1.3,
               spaceBetween: 20,
            },
            450: {
               slidesPerView: 1.4,
            },
            500: {
               slidesPerView: 1.5,
            },
            550: {
               slidesPerView: 1.6,
            },
            600: {
               slidesPerView: 1.8,
            },
            650: {
               slidesPerView: 1.9,
            },
            700: {
               slidesPerView: 2,
            },
            750: {
               slidesPerView: 2.1,
               spaceBetween: 25,
            },
            800: {
               slidesPerView: 2.2,
            },
            850: {
               slidesPerView: 2.3,
            },
            900: {
               slidesPerView: 2.4,
            },
            950: {
               slidesPerView: 2.5,
            },
            1000: {
               slidesPerView: 2.6,
               spaceBetween: 32,
            },
            1100: {
               slidesPerView: 2.7,
               spaceBetween: 32,
            },
            1200: {
               slidesPerView: 2.8,
               spaceBetween: 32,
            },
            1300: {
               slidesPerView: 2.9,
               spaceBetween: 32,
            },
            1400: {
               slidesPerView: 3,
               spaceBetween: 32,
            },
         },
      });

      body.addEventListener("click", relocateToPage);

      function relocateToPage(e) {
         if (e.target.closest(".products__body .card-item:first-child")) {
            location.href = "product-2.html";
         } else if (e.target.closest(".products__body .card-item:nth-child(2)")) {
            location.href = "product-1.html";
         } else if (e.target.closest(".products__body .card-item:nth-child(4)")) {
            location.href = "product-4.html";
         } else if (e.target.closest(".products__body .card-item:nth-child(5)")) {
            location.href = "product-5.html";
         } else if (e.target.closest(".card-item:not(.card-item_discount)")) {
            location.href = "product-1.html";
         } else if (e.target.closest(".card-item_discount")) {
            location.href = "product-discount.html";
         }
      }
   }
   //Product.html
   if (qs("body.product")) {
      body.addEventListener("click", relocateToPage);

      function relocateToPage(e) {
         if (e.target.closest(".card-item:not(.card-item_discount)")) {
            location.href = "product-1.html";
         } else if (e.target.closest(".card-item_discount")) {
            location.href = "product-discount.html";
         }
      }
   }
   //Cart.html
   if (qs(".cart")) {
      const cartDeliver = qa(".item-body__content"),
         checkbox = qa(".item-body__ok-icon");
      body.addEventListener("click", checkboxToggle);

      function checkboxToggle(e) {
         if (e.target.closest(".item-body__ok-icon")) {
            e.target.closest(".item-body__content").classList.toggle("disabled");
         } else if (e.target.closest(".cart__bottom.disabled")) {
            qs(".cart__bottom").classList.remove("disabled");
            setTimeout(() => {
               document.location.href = "ordering.html";
            }, 1000);
         } else if (e.target.closest(".cart__bottom__btn")) {
            qs(".cart__bottom").classList.add("disabled");
         } else if (e.target.closest(".item-body__icon-wrapper")) {
            e.target.closest(".cart-item ").remove();
            if (qs(".cart__items").children.length == 0) {
               qs(".cart__fix").remove();
               qs(".cart__bottom").remove();
               qs(".cart__empty").classList.add("active");
            }
         } else if (e.target.closest(".cart__close-icon")) {
            qs(".cart").classList.remove("active");
            body.classList.remove("lock");
         } else if (e.target.closest(".ic-cart")) {
            qs(".cart").classList.add("active");
            body.classList.add("lock");
         } else if (!e.target.closest(".cart__wrapper") && e.target.closest(".cart")) {
            qs(".cart").classList.remove("active");
            body.classList.remove("lock");
         }
      }
   }
   //Personal-pack.html
   if (qs("body.personal-pack")) {
      body.addEventListener("click", relocateToPage);

      function relocateToPage(e) {
         if (e.target.closest(".card-item:not(.card-item_discount)")) {
            location.href = "product-1.html";
         } else if (e.target.closest(".card-item_discount")) {
            location.href = "product-discount.html";
         }
      }

      body.addEventListener("click", showSection);
      // window.addEventListener("resize", isVisible);

      if (window.innerWidth <= 768) {
         qs(".cards").classList.add("hidden");
         qs(".cards__button").classList.add("grey");
         qs(".hero").classList.add("hidden");
      } else {
         qs(".cards").classList.remove("hidden");
         qs(".hero").classList.remove("hidden");
         qs(".cards__button").classList.remove("grey");
         qs(".cards__button").classList.add("regular");
      }

      isVisible();
      function isVisible() {
         if (window.innerWidth <= 768) {
            qs(".cards").classList.add("hidden");
            qs(".cards__button").classList.add("grey");
            qs(".hero").classList.add("hidden");
         } else {
            qs(".cards").classList.remove("hidden");
            qs(".hero").classList.remove("hidden");
            qs(".cards__button").classList.remove("grey");
            qs(".cards__button").classList.add("regular");
         }
      }

      function showSection(e) {
         if (e.target.closest(".cards__button")) {
            qs(".hero").classList.remove("hidden");
            qs(".cards").classList.remove("hidden");
            qs(".cards__button").classList.remove("grey");
            qs(".cards__button").classList.add("regular");
         }
      }
   }
   //ordering.html
   if (qs("body.ordering")) {
      //Show/hide Card
      body.addEventListener("click", switchCard);

      function switchCard(e) {
         if (e.target.closest(".ordering-card__top")) {
            qs(".ordering-card").classList.toggle("opened");
            if (!qs(".ordering-card").classList.contains("opened")) {
               let cardScrollHeight = qs(".ordering-card__content").scrollHeight;
               qs(".ordering-card__content").style.height = null;
            } else {
               console.log("opened");
               let cardScrollHeight = qs(".ordering-card__content").scrollHeight;
               qs(".ordering-card__content").style.height = cardScrollHeight + "px";
            }
         }
      }

      //Position button
      window.addEventListener("resize", changePosition);

      changePosition();
      function changePosition(e) {
         if (window.innerWidth > 768) {
            qs(".ordering-card").classList.add("opened");
         }
         if (window.innerWidth > 1000) {
            qs(".ordering-card__content").append(qs("form .btn"));
         } else {
            qs(".hero__billing").append(qs("form .btn"));
         }
      }

      // Spoiler.html & Buttons
      if (qs(".spoiler") && qs("form .btn")) {
         body.addEventListener("click", switchClass);

         function switchClass(e) {
            const spoiler = qs(".spoiler"),
               spoilerBody = qs(".spoiler__wrapper");

            if (e.target.closest(".spoiler__preview")) {
               spoiler.classList.toggle("opened");
               if (!spoiler.classList.contains("opened")) {
                  spoilerBody.style.height = null;
               } else {
                  let spoilerWrapperScrollHeight = spoilerBody.scrollHeight;
                  spoilerBody.style.height = spoilerWrapperScrollHeight + "px";
               }
            } else if (e.target.closest(".pop-up .btn")) {
               e.preventDefault();
               document.location = "index.html";
               setTimeout(() => {
                  qs(".pop-up").classList.remove("active");
               }, 10000);
            }
         }
      }

      // ! Validating ===========================================================

      qs("form .btn").addEventListener("click", validate);

      function validate(e) {
         e.preventDefault();
         const regExpWords = /[a-zA-Z]+$/;
         const regExpNumbers = /\d+$/;
         // const regExpNumbers = /^[0-9]+$/; // Добавить проверку на пробел
         const regExpAddress = /^[a-zA-Z0-9]+$/;
         const regExpEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
         const regExpCard = /[0-9\s?\-?]{16,20}/;
         const regExpExpiration = /[0-9]{2}[\/\\\-]{1}[0-9]{2}/;
         const regExpCvc = /[0-9]{3}/;

         const firstName = qs("#firstName").value;
         const lastName = qs("#lastName").value;
         const address = qs("#address1").value;
         const city = qs("#city").value;
         const zip = qs("#zip").value;
         const email = qs("#email").value;
         const phone = qs("#phone").value;
         const card = qs("#card").value;
         const expiration = qs("#expiration").value;
         const cvc = qs("#cvc").value;

         //1234 1234 1234 1234

         if (
            validation(regExpWords, firstName) &&
            validation(regExpWords, lastName) &&
            validation(regExpWords, city) &&
            validation(regExpNumbers, zip) &&
            validation(regExpEmail, email) &&
            validation(regExpNumbers, phone) &&
            validation(regExpCard, card) &&
            validation(regExpExpiration, expiration) &&
            validation(regExpCvc, cvc)
         ) {
            qs(".pop-up").classList.add("active");
            body.classList.add("lock");
            qs(".hero__containe").classList.remove("not-valid");
         } else {
            qs("form .btn").style.backgroundColor = "#C3BDB6";
            qs("form .btn").style.borderColor = "#C3BDB6";
            qs(".hero__containe").classList.add("not-valid");
         }

         function validation(regex, inp) {
            console.log(inp.value);
            return regex.test(inp);
         }
      }
   }

   //profile.html
   if (qs("body.profile")) {
      // Spoiler
      if (qa(".spoiler")) {
         window.addEventListener("resize", () => {
            if (window.innerWidth <= 999) {
               qa(".spoiler")[0].classList.remove("opened");
            }
         });

         body.addEventListener("click", toggleSpoiler);

         function toggleSpoiler(e) {
            if (e.target.closest(".spoiler__preview")) {
               e.target.closest(".spoiler").classList.toggle("opened");
               let spoilerWrapper = e.target.closest(".spoiler__preview").nextElementSibling;
               if (!e.target.closest(".spoiler").classList.contains("opened")) {
                  spoilerWrapper.style.height = null;
               } else {
                  spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
               }
            }
         }
      }

      //Табы
      if (qs(".sidebar__list")) {
         body.addEventListener("click", changeTab);

         function changeTab(e) {
            if (e.target.closest("li.active")) {
               return;
            } else if (e.target.closest("li#subscriptions")) {
               removeActive(e.target);
               qs(".profile__subscriptions").classList.add("active");
            } else if (e.target.closest("li#orders")) {
               removeActive(e.target);
               qs(".profile__orders").classList.add("active");
            } else if (e.target.closest("li#account")) {
               removeActive(e.target);
               qs(".profile__account-overview").classList.add("active");
            } else if (e.target.closest("li#payment")) {
               removeActive(e.target);
               qs(".profile__payment-methods").classList.add("active");
            } else if (e.target.closest("li#password")) {
               removeActive(e.target);
               qs(".profile__change-password").classList.add("active");
            }
            function removeActive(element) {
               qa(".sidebar__list li").forEach((el) => {
                  el.classList.remove("active");
               });
               element.classList.add("active");
               qa("section").forEach((el) => {
                  el.classList.remove("active");
               });
            }
         }
      }
      //Всплывающая кнопка успешного сохранения
      qs(".profile__account-overview .btn").addEventListener("click", () => {
         qs(".profile__account-overview .saved").classList.add("active");
         setTimeout(() => {
            qs(".profile__account-overview .saved").classList.remove("active");
         }, 5000);
      });
   }

   //index.html
   if (qs("body.home")) {
      if (qs(".comments")) {
         const swiperComments = new Swiper(".comments .swiper", {
            initialSlide: 0,
            slideToClickedSlide: true,
            slidesPerView: 1.07,
            spaceBetween: 10,
            breakpoints: {
               380: {
                  slidesPerView: 1.06,
               },
               400: {
                  slidesPerView: 1.3,
                  spaceBetween: 20,
               },
               450: {
                  slidesPerView: 1.4,
               },
               500: {
                  slidesPerView: 1.5,
               },
               550: {
                  slidesPerView: 1.6,
               },
               600: {
                  slidesPerView: 1.8,
               },
               650: {
                  slidesPerView: 1.9,
               },
               700: {
                  slidesPerView: 2,
               },
               750: {
                  slidesPerView: 2.1,
                  spaceBetween: 25,
               },
               800: {
                  slidesPerView: 2.2,
               },
               850: {
                  slidesPerView: 2.3,
               },
               900: {
                  slidesPerView: 2.4,
               },
               950: {
                  slidesPerView: 2.5,
               },
               1000: {
                  slidesPerView: 2.6,
                  spaceBetween: 32,
               },
               1100: {
                  slidesPerView: 2.7,
                  spaceBetween: 32,
               },
               1200: {
                  slidesPerView: 2.8,
                  spaceBetween: 32,
               },
               1300: {
                  slidesPerView: 2.9,
                  spaceBetween: 32,
               },
               1400: {
                  slidesPerView: 3,
                  spaceBetween: 32,
               },
            },
         });
      }
      if (qs(".products")) {
         const swiperCards = new Swiper(".slider-cards", {
            slideToClickedSlide: true,
            slidesPerView: 1.004,
            spaceBetween: 10,
            breakpoints: {
               395: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
               },
               550: {
                  slidesPerView: 1.5,
               },
               650: {
                  slidesPerView: 1.8,
               },
               750: {
                  spaceBetween: 20,
                  slidesPerView: 2,
               },
               1000: {
                  spaceBetween: 33,
                  slidesPerView: 2,
               },
            },
         });
      }
   }
   // header
   if (qs(".header")) {
      qs(".header-aside_4 .second-menu").addEventListener("click", relocate);

      function relocate(e) {
         e.preventDefault();
         if (e.target.closest(".second-menu li")) {
            if (e.target.innerHTML == "Subscriptions") {
               document.location.href = "profile.html";
            } else if (e.target.innerHTML == "Orders") {
               document.location.href = "profile.html";
            } else if (e.target.innerHTML == "Account Overview") {
               document.location.href = "profile.html";
            } else if (e.target.innerHTML == "Payment methods") {
               document.location.href = "profile.html";
            } else if (e.target.innerHTML == "Change Password") {
               document.location.href = "profile.html";
            }
         }
      }
      qs("#menu-profile").addEventListener("click", () => {
         if (window.innerWidth >= 1025) {
            location.href = "profile.html";
         }
      });
   }
});
