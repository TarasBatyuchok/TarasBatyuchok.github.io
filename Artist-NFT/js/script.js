"use strict";
const burger = document.querySelector(".burger"),
   header = document.querySelector(".header"),
   headerAction = document.querySelector(".header__action"),
   body = document.querySelector("body");

window.addEventListener("load", () => {
   function qs(element) {
      let newEl = document.querySelector(element);
      if (newEl) return newEl;
   }
   function qa(element) {
      let newEl = document.querySelectorAll(element);
      if (newEl) return newEl;
   }

   // ! Burger
   if (burger) {
      body.addEventListener("click", burgerToggle);
      function burgerToggle(e) {
         if (e.target.closest(".burger")) {
            if (burger.classList.contains("active")) {
               closeBurger();
            } else {
               burger.classList.add("active");
               header.classList.add("active");
               headerAction.classList.add("active");
               body.classList.add("lock");
               actualizeHeight();
               window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
            }
         } else if (e.target.closest(".spoiler__preview")) {
            //Трудночитаемый код на коленке. лучше сюда не лезть.
            // Изменение высоты открытого меню при клике на спойлер
            if (window.innerWidth <= 1050) {
               if (!qs(".spoiler").classList.contains("opened")) {
                  setTimeout(() => {
                     qs(".header__action-wrapper").style.height =
                        qs(".header__action-wrapper").scrollHeight + qs("header .spoiler__wrapper").scrollHeight + "px";
                  }, 300);
               } else {
                  setTimeout(() => {
                     qs(".header__action-wrapper").style.height =
                        qs(".header__action-wrapper").scrollHeight - qs("header .spoiler__wrapper").scrollHeight + "px";
                  }, 300);
               }
            }
         } else if (!e.target.closest(".burger") && !e.target.closest(".header__action-wrapper")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            headerAction.classList.remove("active");
            body.classList.remove("lock");
            closeBurger();
         }
      }
      function closeBurger() {
         //Обязательная дополнительная проверка
         if (burger.classList.contains("active")) {
            burger.classList.remove("active");
            header.classList.remove("active");
            headerAction.classList.remove("active");
            body.classList.remove("lock");
            setTimeout(() => {
               qs(".header__action-wrapper").style.height = null;
            }, 1000);
            window.removeEventListener("scroll", closeBurger);
         }
      }

      function actualizeHeight(e) {
         const headerActionWrapper = qs(".header__action-wrapper");
         const headerActionBody = qs(".header__action-body");
         const wrapperHeight = headerActionWrapper.scrollHeight;
         const bodyHeight = headerActionBody.scrollHeight;
         const total = wrapperHeight + bodyHeight;
         if (headerAction.classList.contains("active")) {
            if (total >= window.innerHeight) {
               headerActionWrapper.style.height = "100%";
            } else {
               headerActionWrapper.style.height = wrapperHeight + bodyHeight + "px";
            }
         }
      }
   }

   // ! Header
   //Relocate to some pages
   if (qs(".header")) {
      qs(".btn.authorization").addEventListener("click", () => {
         document.location.href = "authorization.html";
      });
      qs(".premium-acess").addEventListener("click", () => {
         document.location.href = "payment.html";
      });
      qs(".header__premium-btn").addEventListener("click", () => {
         document.location.href = "payment.html";
      });
      body.addEventListener("click", relocate);

      function relocate(e) {
         if (e.target.closest(".product-link")) {
            document.location.href = "product.html";
         }
      }
   }

   // ! Spoiler.html
   if (qs(".spoiler")) {
      // ? Если нужно открыть только первый спойлер на странице. Можно прогнать циклом для остальных
      if (qs(".spoiler").classList.contains("opened")) {
         let spoilerWrapper = qa(".spoiler__wrapper")[0];
         spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
      }

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

   // ! index.html
   if (qs("body.home")) {
      // Relocate
      qs(".hello-h1 .premium-acess").addEventListener("click", () => {
         document.location.href = "payment.html";
      });
      // Move graphic
      window.addEventListener("resize", moveBlock);
      moveBlock();
      function moveBlock(e) {
         if (window.innerWidth <= 768) {
            qs(".hello-h2__title").after(qs(".biography__graphic"));
         } else if (window.innerWidth > 768) {
            qs(".biography__container").prepend(qs(".biography__graphic"));
         }
      }

      // swiperBiography
      const swiperBiography = new Swiper(".biography__swiper", {
         spaceBetween: 22,
         slidesPerView: 2.47,
         slideToClickedSlide: true,
         breakpoints: {
            460: {
               slidesPerView: 2.75,
               spaceBetween: 28,
            },
            769: {
               slidesPerView: 2,
            },
            1000: {
               slidesPerView: 2.5,
               spaceBetween: 35,
            },
            1200: {
               slidesPerView: 3,
               spaceBetween: 9,
            },
         },
      });

      // swiperCards
      const swiperNft = new Swiper(".slider__swiper", {
         spaceBetween: 16,
         slidesPerView: 1.27025,
         slideToClickedSlide: true,
         loop: true,
         initialSlide: 0,
         breakpoints: {
            460: {
               slidesPerView: 1.6,
            },
            560: {
               slidesPerView: 1.9,
            },
            660: {
               slidesPerView: 2.3,
            },
            769: {
               slidesPerView: 2.7,
               spaceBetween: 23,
            },
            900: {
               slidesPerView: 3.2,
            },
            1000: {
               slidesPerView: 3.4,
            },
            1200: {
               slidesPerView: 3.8683,
               spaceBetween: 30,
               centeredSlides: true,
               initialSlide: 1,
            },
         },
      });
   }

   // ! nfts.html
   if (qs("body.nfts")) {
      body.addEventListener("click", relocate);

      function relocate(e) {
         if (e.target.closest(".nft-card-item .btn")) {
            document.location.href = "product-1.html";
         }
      }
   }

   // ! confirm button
   if (qs(".confirm")) {
      qs(".confirm").addEventListener("click", (e) => {
         e.preventDefault();
         qs(".confirm svg").classList.toggle("active");
      });
   }

   // ! product-1.html
   if (qs("body.product-1") || qs("body.product-1-unlocked")) {
      body.addEventListener("click", clickVideo);

      function clickVideo(e) {
         if (e.target.closest(".process__video svg") || e.target.closest(".process__poster")) {
            qs("video").style.zIndex = "5";
            qs("video").setAttribute("controls", "true");
            qs("video").play();
            qs(".process__poster").style.opacity = "0";
         } else if (e.target.closest(".process .btn") || e.target.closest("body.product-1 .hero__line .btn")) {
            document.location.href = "product-1-unlocked.html";
         }
      }
   }

   // ! forum.html
   if (qs("body.forum")) {
      // swiperCards
      const swiper = new Swiper(".swiper", {
         spaceBetween: 14,
         slidesPerView: 1.23,
         slideToClickedSlide: true,
         loop: true,
         breakpoints: {
            460: {
               slidesPerView: 1.4,
            },
            560: {
               slidesPerView: 1.7,
            },
            660: {
               slidesPerView: 1.9,
            },
            769: {
               slidesPerView: 2.2,
               spaceBetween: 20,
            },
            900: {
               slidesPerView: 2.6,
            },
            1000: {
               slidesPerView: 2.8,
            },
            1150: {
               slidesPerView: 3,
               spaceBetween: 30,
            },
         },
      });

      //Move comment title
      window.addEventListener("resize", moveTitle);

      moveTitle();
      function moveTitle(e) {
         const firstTop = qs(".comments__items > :nth-child(1) .forum-comment__top");
         const secondTop = qs(".comments__items > :nth-child(2) .forum-comment__top");
         const thirdTop = qs(".comments__items > :nth-child(3) .forum-comment__top");
         const firstLine = qs(".comments__items > :nth-child(1) .forum-comment__text-line-left");
         const secondLine = qs(".comments__items > :nth-child(2) .forum-comment__text-line-left");
         const thirdLine = qs(".comments__items > :nth-child(3) .forum-comment__text-line-left");
         const firstTitle = qs(".comments__items > :nth-child(1) .forum-comment__title");
         const secondTitle = qs(".comments__items > :nth-child(2) .forum-comment__title");
         const thirdTitle = qs(".comments__items > :nth-child(3) .forum-comment__title");
         if (window.innerWidth <= 768) {
            firstTop.append(firstTitle);
            secondTop.append(secondTitle);
            thirdTop.append(thirdTitle);
         } else {
            firstLine.append(firstTitle);
            secondLine.append(secondTitle);
            thirdLine.append(thirdTitle);
         }
      }
   }

   // ! forum.html
   if (qs("body.authorization")) {
      body.addEventListener("click", changeLayout);

      function changeLayout(e) {
         if (e.target.getAttribute("data-location") == "Log in") {
            body.className = "authorization log-in";
            qa(".hero__button")[0].classList.add("active");
            qa(".hero__button")[1].classList.remove("active");
            qa(".hero__link")[0].classList.add("active");
            qa(".hero__link")[1].classList.remove("active");
         } else if (e.target.getAttribute("data-location") == "Sign up") {
            body.className = "authorization sign-up";
            qa(".hero__button")[1].classList.add("active");
            qa(".hero__button")[0].classList.remove("active");
            qa(".hero__link")[1].classList.add("active");
            qa(".hero__link")[0].classList.remove("active");
         } else if (e.target.closest(".hero__radio")) {
            qa(".hero__radio").forEach((el) => {
               el.classList.remove("active");
            });
            e.target.closest(".hero__radio").classList.add("active");
         } else if (e.target.closest(".hero__btn")) {
            document.location.href = qs(".hero__radio.active").getAttribute("data-url");
         }
      }
   }

   // ! admin.html
   if (qs("body.admin")) {
      // ! Burger
      const adminBurger = qs(".admin-burger"),
         adminHeader = qs(".admin-header"),
         asideAction = document.querySelector(".aside__action");
      if (adminBurger) {
         body.addEventListener("click", burgerToggle);
         function burgerToggle(e) {
            if (e.target.closest(".admin-burger")) {
               if (adminBurger.classList.contains("active")) {
                  closeBurger();
               } else {
                  adminBurger.classList.add("active");
                  adminHeader.classList.add("active");
                  asideAction.classList.add("active");
                  body.classList.add("lock");
                  actualizeHeight();
                  window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
               }
            } else if (
               (!e.target.closest(".admin-burger") && !e.target.closest(".aside__action-wrapper")) ||
               e.target.closest(".menu li")
            ) {
               adminBurger.classList.remove("active");
               adminHeader.classList.remove("active");
               asideAction.classList.remove("active");
               body.classList.remove("lock");
               closeBurger();
               actualizeHeight();
            }
         }
         function closeBurger() {
            //Обязательная дополнительная проверка
            if (adminBurger.classList.contains("active")) {
               adminBurger.classList.remove("active");
               adminHeader.classList.remove("active");
               asideAction.classList.remove("active");
               body.classList.remove("lock");
               setTimeout(() => {
                  qs(".aside__action-wrapper").style.height = null;
               }, 1000);
               window.removeEventListener("scroll", closeBurger);
            }
         }

         function actualizeHeight(e) {
            const asideActionWrapper = qs(".aside__action-wrapper");
            const asideActionBody = qs(".aside__action-body");
            const wrapperHeight = asideActionWrapper.scrollHeight;
            const bodyHeight = asideActionBody.scrollHeight;
            const total = wrapperHeight + bodyHeight;
            if (asideAction.classList.contains("active")) {
               if (total >= window.innerHeight) {
                  asideActionWrapper.style.height = "100%";
               } else {
                  asideActionWrapper.style.height = wrapperHeight + bodyHeight + "px";
               }
            }
         }
      }

      // Клик по табу в сайдбаре
      body.addEventListener("click", changeLayout);

      function changeLayout(e) {
         // Клик по табу в сайдбаре
         if (e.target.closest(".menu__item")) {
            qa(".menu__item").forEach((el) => {
               el.classList.remove("active");
            });
            e.target.closest(".menu__item").classList.add("active");
            if (e.target.closest(".menu__item").getAttribute("data-location") == "orders") {
               setTimeout(() => {
                  changeOrdersColumnsWidth();
               }, 50);
            } else if (e.target.closest(".menu__item").getAttribute("data-location") == "nft") {
               setTimeout(() => {
                  changeNftColumnsWidth();
               }, 50);
            } else if (e.target.closest(".menu__item").getAttribute("data-location") == "workers") {
               setTimeout(() => {
                  changeWorkersColumnsWidth();
               }, 50);
            }
            qa("section").forEach((el) => {
               el.classList.remove("active");
               if (el.classList.contains(e.target.closest(".aside__menu li").getAttribute("data-location"))) {
                  el.classList.add("active");
               }
            });
         } else if (e.target.closest(".chat-list-items__item")) {
            qs(".messages__chat").classList.add("visible");
            window.scrollTo(0, 64);
         } else if (e.target.closest(".chat__title svg")) {
            qs(".messages__chat").classList.remove("visible");
         }
      }

      // Изменения ширины колонок заголовков таблицы
      window.addEventListener("resize", changeOrdersColumnsWidth);

      changeOrdersColumnsWidth();
      function changeOrdersColumnsWidth(e) {
         if (window.innerWidth > 768) {
            const items = qs(".orders__item").children;
            const heading = qs(".orders__heading");
            const columns = heading.children;
            const mw = [];
            //Скидываем ширину колонок шапки что бы джс прочитал акутальную ширину в колонках айтемов
            heading.style.gridTemplateColumns = "repeat(8, 1px)";
            for (let i = 0; i < columns.length; i++) {
               let item = items[i].getBoundingClientRect().width;
               let column = columns[i].getBoundingClientRect().width;
               if (item >= column) {
                  mw.push(item);
               } else {
                  mw.push(column);
               }
            }
            heading.style.display = "grid";
            heading.style.gridTemplateColumns = `${mw[0]}px ${mw[1]}px ${mw[2]}px ${mw[3]}px ${mw[4]}px ${mw[5]}px ${mw[6]}px ${mw[7]}px `;
         }
      }
      window.addEventListener("resize", changeNftColumnsWidth);

      changeNftColumnsWidth();
      function changeNftColumnsWidth(e) {
         if (window.innerWidth > 768) {
            const items = qs(".nft-orders__item").children;
            const heading = qs(".nft-orders__heading");
            const columns = heading.children;
            const mw = [];
            //Скидываем ширину колонок шапки что бы джс прочитал акутальную ширину в колонках айтемов
            heading.style.gridTemplateColumns = "repeat(5, 1px)";
            for (let i = 0; i < columns.length; i++) {
               let item = items[i].getBoundingClientRect().width;
               let column = columns[i].getBoundingClientRect().width;
               if (item >= column) {
                  mw.push(item);
               } else {
                  mw.push(column);
               }
            }
            heading.style.display = "grid";
            heading.style.gridTemplateColumns = `${mw[0]}px ${mw[1]}px ${mw[2]}px ${mw[3]}px ${mw[4]}px`;
         }
      }

      window.addEventListener("resize", changeWorkersColumnsWidth);

      changeWorkersColumnsWidth();
      function changeWorkersColumnsWidth(e) {
         if (window.innerWidth > 768) {
            const items = qs(".workers__item").children;
            const heading = qs(".workers__heading");
            const columns = heading.children;
            const mw = [];
            //Скидываем ширину колонок шапки что бы джс прочитал акутальную ширину в колонках айтемов
            heading.style.gridTemplateColumns = "repeat(4, 1px)";
            for (let i = 0; i < columns.length; i++) {
               let item = items[i].getBoundingClientRect().width;
               let column = columns[i].getBoundingClientRect().width;
               if (item >= column) {
                  mw.push(item);
               } else {
                  mw.push(column);
               }
            }
            heading.style.display = "grid";
            heading.style.gridTemplateColumns = `${mw[0]}px ${mw[1]}px ${mw[2]}px ${mw[3]}px`;
         }
      }

      // swiperBiography
      const swiper = new Swiper(".swiper", {
         spaceBetween: 28,
         slidesPerView: 3.5,
         slideToClickedSlide: true,
         breakpoints: {
            375: {
               slidesPerView: 4.4,
            },
            460: {
               slidesPerView: 5,
            },
            560: {
               slidesPerView: 6,
            },
            660: {
               slidesPerView: 7,
            },
         },
      });
   }

   // !payment.html
   if (qs("body.payment") || qs("body.components") || qs("body.pricing") || qs("body.school")) {
      const tabBtns = document.querySelectorAll(".tabs__nav-btn");
      const tabsItems = document.querySelectorAll(".tabs__item");
      const confirmBtns = document.querySelectorAll(".tabs__confirm");
      qa(".tabs__nav-btn").forEach((item) => {
         item.addEventListener("click", () => {
            let tabId = item.getAttribute("data-tab");
            let currentTab = document.querySelector(tabId);
            if (!item.classList.contains("active")) {
               tabBtns.forEach((item) => {
                  item.classList.remove("active");
               });

               tabsItems.forEach((item) => {
                  item.classList.remove("active");
               });

               item.classList.add("active");
               currentTab.classList.add("active");
            }
         });
      });

      let popup = document.querySelector(".popup");
      let tabs = document.querySelector(".payment__content");
      let closePopup = document.querySelector(".popup__confirm");

      confirmBtns.forEach((item) => {
         item.addEventListener("click", () => {
            popup.classList.remove("none");
            tabs.classList.add("none");
         });

         closePopup.addEventListener("click", () => {
            popup.classList.add("none");
            tabs.classList.remove("none");
         });
      });
   }

   //!team.html
   if (qs("body.team")) {
      qs(".school-link").addEventListener("click", () => {
         document.location.href = "school.html";
      });
   }
});
