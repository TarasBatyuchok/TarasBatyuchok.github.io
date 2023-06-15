function preloader() {
  try {
    document.body.onload = function () {
      setTimeout(() => {
        const preloader = document.getElementById("preloader");
        if (!preloader.classList.contains("done")) {
          preloader.classList.add("done");
        }
      }, 400);
    };
  } catch {
    console.error();
  }
}

function menu() {
  // Меню бургер
  const iconMenu = document.querySelector(".menu__icon");
  const menuBody = document.querySelector(".navbar__items");
  if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
      // remove scrolink when we have open navbar
      document.body.classList.toggle("_lock");
      // add active class for  icon X
      // add active class for list
      iconMenu.classList.toggle("active");
      menuBody.classList.toggle("active");
    });
  }
}

function menuLink() {
  const navItems = document.querySelectorAll("#item");
  const iconMenu = document.querySelector(".menu__icon");
  const menuBody = document.querySelector(".navbar__items");
  navItems.forEach((navItem) => {
    navItem.addEventListener("click", function (e) {
      document.body.classList.toggle("_lock");
      iconMenu.classList.remove("active");
      menuBody.classList.remove("active");
    });
  });
}

function swiperSlider() {
  new Swiper(".hero__slider", {
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
  }),
    new Swiper(".exclusive__slider", {
      navigation: {
        nextEl: ".exclusive__next",
        prevEl: ".exclusive__prev",
      },
      centeredSlides: true,

      slidesPerView: 4,
      spaceBetween: 16,
      on: {
        init: function () {
          // Отримання активного слайда при ініціалізації слайдера
          const activeSlide = this.slides[this.activeIndex];
          if (activeSlide) {
            const image = activeSlide.querySelector("img").getAttribute("src");
            setSectionBackground(image);
          }
        },
        slideChange: function () {
          const activeSlide = this.slides[this.activeIndex];
          const image = activeSlide.querySelector("img").getAttribute("src");
          setSectionBackground(image);
        },
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      },
    });
}

function year() {
  const yearElement = document.querySelector("#year");
  const currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;
}

function animation() {
  // gsap.registerPlugin(ScrollTrigger)
  const tl = gsap.timeline();
  tl.fromTo(
    ".slider-description h4",
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1 },
    // час за скільки часу анімація почнеться
    1
  )
    .fromTo(
      ".slider-description p",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      0.8
    )
    .fromTo(
      ".wrapper-btn",
      {
        x: -60,
        opacity: 0,
        scaleY: 0.5,
      },
      {
        x: 0,
        opacity: 1,
        scaleY: 1,
      },
      0.8
    )
    .fromTo(
      ".logo",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
      },
      1.4
    )
    .fromTo("#item",
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15, 
      },
      1.4
    )
    .fromTo(
      ".menu__icon",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, },
      1.4
    );
    // scroll animation
    // gsap.to('.slider-description',{
    //   scrollTrigger:{
    //     trigger: ".hero",
    //     // markers: true,
    //     start: 'top top',
    //     scrub:true,
    //   },
    //   yPercent: 50,
    //   scale: 0.5,
    //   xPercent: -50,
    //   opacity: 0,
    // })


    // region animation
    // gsap.from('#card', {
    //   scrollTrigger: {
    //     trigger: '.best__container',
    //     start: '-30% center',
    //     end: '+=300px',
    //     // markers: true,
    //     scrub: true,
    //   },
    //   scale: 0,
    //   transformOrigin: 'top center',
    //   ease: 'none',

    // });
}

function setSectionBackground(image) {
  const exclusiveElement = document.querySelector(".exclusive");
  exclusiveElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`;
  exclusiveElement.style.backgroundSize = "cover";
}

swiperSlider();

menu();
animation();
preloader();
year();
menuLink();
