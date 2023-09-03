"use strict";
const burger = document.querySelector('.burger'),
	menu = document.querySelector('.menu'),
	header = document.querySelector('.header'),
	body = document.querySelector('body');

window.addEventListener('load', () => {
	//Бургер
	if (burger) {
		body.addEventListener('click', burgerToggle)
		function burgerToggle(e) {
			// alert("Click") // Для проверки вызова функции кликом
			if (e.target.closest('.burger')) {
				burger.classList.toggle('active');
				menu.classList.toggle('active');
				header.classList.toggle('active');
				window.addEventListener('scroll', closeBurger)
			} else if (!e.target.closest('.burger')) {
				burger.classList.remove('active');
				menu.classList.remove('active');
				header.classList.remove('active');
				window.removeEventListener('scroll', closeBurger)
			}
		}

		function closeBurger() {
			if (burger.classList.contains('active')) { //Необязательная дополнительная проверка
				burger.classList.remove('active');
				menu.classList.remove('active');
				header.classList.remove('active');
				body.classList.remove('lock');
				window.removeEventListener('scroll', closeBurger)
			}
		}

		const menuList = document.querySelector('.menu__list')

		window.addEventListener('resize', addItem)

		addItem()
		function addItem() {
			const newLi = document.createElement('li')
			newLi.innerHTML = '<a href="index.html" class="menu__link link link-to-delete">Home</a>'
			if (window.innerWidth <= 1024) {
				if (!document.querySelector('.link-to-delete')) menuList.prepend(newLi)
			} else if (window.innerWidth > 1024) {
				if (document.querySelector('.link-to-delete')) menuList.firstElementChild.remove()
			}
		}
	}

	//=============================================================================
	// index.html
	//=============================================================================

	if (document.querySelector('body.home')) {

		// Слайдер
		if (document.querySelector('.swiper')) {
			const swiper = new Swiper('.swiper', {
				speed: 500,
				simulateTouch: true,
				slideToClickedSlide: true,
				slidesPerView: 1.2,
				breakpoints: {
					320: {
						slidesPerView: 1.173,
					}
				}
			});
			const btns = [document.querySelector('.hero__next'), document.querySelector('.left-arrow'), document.querySelector('.right-arrow')]
			btns.forEach(el => {
				el.addEventListener('click', () => {
					if (el.classList.contains('left-arrow')) {
						swiper.slidePrev(500, false);
					} else {
						swiper.slideNext(500, false);
					}
				})
			})
		}

		//Меняем текст в контактах... (.hero)
		if (document.querySelector('.hero__mail') && document.querySelector('.hero__tel')) {
			const mail = document.querySelector('.hero__mail'),
				tel = document.querySelector('.hero__tel');
			window.addEventListener('resize', changeHero)
			changeHero()
			function changeHero() {
				if (window.innerWidth <= 1024) {
					mail.innerHTML = 'info@hi-light.pl'
					tel.innerHTML = '+380935705222'
				} else if (window.innerWidth > 1024) {
					mail.innerHTML = 'E: info@gmail.com'
					tel.innerHTML = '+380983527547'
				}
			}
		}

		//Меняем текст в тайтле айтема... (.gallery)
		if (document.querySelector('.title-to-change')) {
			const titleToChange = document.querySelector('.title-to-change'),
				titlesToChange = document.querySelectorAll('.item-gallery__title3');
			window.addEventListener('resize', changeTitle)
			changeTitle()

			function changeTitle() {
				if (window.innerWidth > 1024) {
					titlesToChange[1].innerHTML = 'Residence by the lighthouse'
				} else if (window.innerWidth <= 1024 && window.innerWidth > 768) {
					titlesToChange[0].innerHTML = 'Eyewear store interior'
					titlesToChange[1].innerHTML = 'Minimalist style home'
					titlesToChange[2].innerHTML = 'Residence by the lighthouse'
					titlesToChange[3].innerHTML = 'Eyewear store interior'
				} else if (window.innerWidth <= 768 && window.innerWidth > 569) {
					titlesToChange[0].innerHTML = 'Residence by the lighthouse'
					titlesToChange[1].innerHTML = 'Minimalist style home'
					titlesToChange[2].innerHTML = 'Eyewear storeinterior'
					titlesToChange[3].innerHTML = 'House on a Hillside'
				} else if (window.innerWidth <= 568) {
					titlesToChange[0].innerHTML = 'Residence by the lighthouse'
					titlesToChange[1].innerHTML = 'Eyewear store interior'
					titlesToChange[2].innerHTML = 'Minimalist style home'
					titlesToChange[3].innerHTML = 'Eyewear store interior'
				}
			}
		}

		//Меняем текст в тайтле contacts... (.contacts)
		if (document.querySelector('.contacts__title2')) {
			const contactsTitle = document.querySelector('.contacts__title2')

			window.addEventListener('resize', changeTitle)

			changeTitle()

			function changeTitle() {
				if (window.innerWidth > 1024) {
					contactsTitle.innerHTML = 'Drop us a line'
				} else if (window.innerWidth <= 1024) {
					contactsTitle.innerHTML = 'Get in touch'
				}
			}
		}
	}

	//=============================================================================
	// news.html
	//=============================================================================

	if (document.querySelector('body.news')) {
		// Меняем текст в тайтле hero (news.html)
		if (document.querySelector('.hero__title2')) {
			const heroTitle = document.querySelector('.hero__title2')
			window.addEventListener('resize', changeTitle)

			changeTitle()

			function changeTitle() {
				if (window.innerWidth <= 568) {
					heroTitle.innerHTML = 'Our news'
				} else if (window.innerWidth > 568) {
					heroTitle.innerHTML = 'Our latest news'
				}
			}
		}

		// Выпадашка Option
		if (document.querySelector('.hero__option')) {
			const heroOption = document.querySelector('.option-hero'),
				optionTitle = document.querySelector('.option-hero__title'),
				optionList = document.querySelector('.option-hero__list');

			body.addEventListener('click', showOptions)
			// В идеале - доработать... Первая ссылка кликается слишком "высоко"
			function showOptions(e) {
				if (!e.target.closest('.hero__option')) {
					heroOption.classList.remove('active')
					heroOption.style.height = null
					optionList.style.height = null
				} else if (e.target.closest('.option-hero').classList.contains('active')) {
					heroOption.classList.remove('active')
					heroOption.style.height = null
					optionList.style.height = null
				} else if (!e.target.closest('.option-hero').classList.contains('active')) {
					heroOption.classList.add('active')
					heroOption.style.height = heroOption.scrollHeight + optionList.scrollHeight + optionTitle.scrollHeight + 'px'
					optionList.style.height = optionList.scrollHeight + 'px'
				}

			}
		}

		// Меняем текст в bg__text(news.html)
		if (document.querySelector('.bg__text')) {
			const bgText = document.querySelector('.bg__text')
			window.addEventListener('resize', changeText)
			changeText()

			function changeText() {
				if (window.innerWidth > 1024) {
					bgText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper eu mauris vitae posuere. Ut at luctus ligula. Nunc ante felis, aliquam.'
				} else if (window.innerWidth <= 1024) {
					bgText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper eu mauris vitae posuere. Ut at luctus ligula. Nunc ante felis, aliquam eu enim sed, ornare pretium velit.'
				}
			}
		}
	}

	//=============================================================================
	// projects.html
	//=============================================================================
	if (document.querySelector('body.projects')) {
		// Выпадашка Option
		if (document.querySelector('.hero__option')) {
			const heroOption = document.querySelector('.option-hero'),
				optionTitle = document.querySelector('.option-hero__title'),
				optionList = document.querySelector('.option-hero__list');

			body.addEventListener('click', showOptions)
			// В идеале - доработать... Первая ссылка кликается слишком "высоко"
			function showOptions(e) {
				if (!e.target.closest('.hero__option')) {
					heroOption.classList.remove('active')
					heroOption.style.height = null
					optionList.style.height = null
				} else if (e.target.closest('.option-hero').classList.contains('active')) {
					heroOption.classList.remove('active')
					heroOption.style.height = null
					optionList.style.height = null
				} else if (!e.target.closest('.option-hero').classList.contains('active')) {
					heroOption.classList.add('active')
					heroOption.style.height = heroOption.scrollHeight + optionList.scrollHeight + optionTitle.scrollHeight + 'px'
					optionList.style.height = optionList.scrollHeight + 'px'
				}

			}
		}

		//Меняем текст в тайтле айтема... (.gallery)
		if (document.querySelector('.item-gallery__title3')) {
			const titlesToChange = document.querySelectorAll('.item-gallery__title3');
			window.addEventListener('resize', changeTitle)
			changeTitle()

			function changeTitle() {
				if (window.innerWidth > 1024) {
					titlesToChange[1].innerHTML = 'Residence by the lighthouse'
				} else if (window.innerWidth <= 1024 && window.innerWidth > 768) {
					titlesToChange[0].innerHTML = 'Eyewear store interior'
					titlesToChange[1].innerHTML = 'Minimalist style home'
					titlesToChange[2].innerHTML = 'Residence by the lighthouse'
					titlesToChange[3].innerHTML = 'Eyewear store interior'
					titlesToChange[4].innerHTML = 'Eyewear store interior'
					titlesToChange[5].innerHTML = 'Residence by the lighthouse'
				} else if (window.innerWidth <= 768 && window.innerWidth > 568) {
					titlesToChange[0].innerHTML = 'Residence by the lighthouse'
					titlesToChange[1].innerHTML = 'Minimalist style home'
					titlesToChange[2].innerHTML = 'Minimalist style home'
					titlesToChange[3].innerHTML = 'Minimalist style home'
					titlesToChange[4].innerHTML = 'Eyewear store interior'
				} else if (window.innerWidth <= 568) {
					titlesToChange[0].innerHTML = 'Residence by the lighthouse'
					titlesToChange[1].innerHTML = 'Eyewear store interior'
					titlesToChange[2].innerHTML = 'Minimalist style home'
					titlesToChange[3].innerHTML = 'Eyewear store interior'
					titlesToChange[4].innerHTML = 'House on a Hillside'
				}
			}
		}

		//Перенаправляем на другую страницу
		if (document.querySelectorAll('.gallery__item')) {
			const galleryItems = document.querySelectorAll('.gallery__item')

			body.addEventListener('click', relocate)

			function relocate(e) {
				if (e.target.closest('.gallery__item')) {
					location.href = 'singleProject.html'
				}
			}
		}
	}

	//=============================================================================
	// about.html
	//=============================================================================
	if (document.querySelector('body.about')) {

		// Слайдер
		if (document.querySelector('.swiper')) {
			const swiper = new Swiper('.swiper', {
				speed: 500,
				simulateTouch: true,
				slideToClickedSlide: true,
				slidesPerView: 1.2,
				spaceBetween: 15,
			});
			const btns = [document.querySelector('.left-arrow'), document.querySelector('.right-arrow')]
			btns.forEach(el => {
				el.addEventListener('click', () => {
					if (el.classList.contains('left-arrow')) {
						swiper.slidePrev(500, false);
					} else {
						swiper.slideNext(500, false);
					}
				})
			})
		}
	}

	//=============================================================================
	// singleNews.html
	//=============================================================================
	if (document.querySelector('body.single-news')) {

		// Change text in singleNewsContentOl.html
		if (document.querySelector('.ol-text-to-change')) {
			const text = document.querySelector('.ol-text-to-change')
			window.addEventListener('resize', changeText)

			changeText()
			function changeText() {
				if (window.innerWidth <= 1024) {
					text.innerHTML = 'Ut arcu tortor, hendrerit eget sollicitudin sed, tincidunt a lectus. Cras gravida ultricies ante sit amet consectetur. Maecenas sed arcu tempor, posuere odio pharetra, faucibus risus. Etiam fermentum felis quis aliquet viverra. Mauris in odio nec mi pellentesque placerat. Praesent at metus in lacus posuere molestie. Aliquam consequat, neque eget congue feugiat, lectus leo condimentum lorem, scelerisque euismod nisi ipsum nec metus. Mauris semper felis venenatis eros interdum sollicitudin.'
				} else if (window.innerWidth > 1024) {
					text.innerHTML = 'Aliquam iaculis ac urna at consequat. Pellentesque fermentum tellus eu nisi viverra gravida. Sed suscipit vestibulum accumsan. Sed ac magna id sem hendrerit convallis quis a magna. Mauris eget ornare est. Morbi metus justo, posuere vel semper semper, eleifend ut purus. Morbi cursus consequat nibh, a feugiat felis tempor vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sodales orci nisl, in lacinia risus rhoncus a. Praesent consectetur egestas risus, id consectetur felis.'
				}
			}
		}

		// Слайдер
		if (document.querySelector('.swiper')) {
			const swiper = new Swiper('.swiper', {
				speed: 500,
				simulateTouch: true,
				slideToClickedSlide: true,
				slidesPerView: 1.2,
				breakpoints: {
					320: {
						slidesPerView: 1.195,
						spaceBetween: 26,
					},
					569: {
						slidesPerView: 1.718,
						spaceBetween: 20,
					},
					769: {
						slidesPerView: 2.718,
						spaceBetween: 40,
					},
					1025: {
						slidesPerView: 3.538,
						spaceBetween: 48,
					}
				}
			});
		}
	}

	//=============================================================================
	// singleProject.html
	//=============================================================================
	if (document.querySelector('body.single-project')) {

		// Change text in  singleProjectHero.html
		if (document.querySelector('.hero__title2')) {
			const title = document.querySelector('.hero__title2')
			window.addEventListener('resize', changeTitle)

			changeTitle()
			function changeTitle() {
				if (window.innerWidth <= 1024) {
					title.innerHTML = 'Residence  <br/> by the lighthouse'
				} else if (window.innerWidth > 1024) {
					title.innerHTML = 'Residence by the lighthouse'
				}
			}
		}

		if (document.querySelector('.vertical-decor')) {
			document.querySelector('.vertical-decor').innerHTML = 'make request'
		}


	}
	//=============================================================================
	// error.html
	//=============================================================================
	if (document.querySelector('body.error')) {

		// Меняем логотип...
		if (document.querySelector('.header__logo')) {
			const logo = document.querySelector('.header__logo')
			window.addEventListener('resize', changeLogo)

			changeLogo()
			function changeLogo() {
				if (window.innerWidth <= 1024) {
					logo.innerHTML = 'Logo'
				} else if (window.innerWidth > 1024) {
					logo.innerHTML = 'hilight'
				}
			}
		}
	}
	//=============================================================================
	// popup.html
	//=============================================================================

	// Меняем Тайтл...
	if (document.querySelector('.form-popup__title')) {
		const popupTitle = document.querySelector('.form-popup__title')
		window.addEventListener('resize', changePopupTitle)

		changePopupTitle()
		function changePopupTitle() {
			if (window.innerWidth <= 1024) {
				popupTitle.innerHTML = 'Make request'
			} else if (window.innerWidth > 1024) {
				popupTitle.innerHTML = 'Calculate the cost of work'
			}
		}
	}

	//Слушаем кнопки открывающие попап
	const btns = document.querySelectorAll('button.btn'),
		btnp = document.querySelectorAll('button.btnp'),
		btnс = document.querySelectorAll('button.btnc'),
		closeIcon = document.querySelectorAll('.close-icon'),
		popup = document.querySelector('.popup');

	body.addEventListener('click', togglePopup)

	function togglePopup(e) {
		if (popup.classList.contains('active')) {
			if (e.target.closest('.close-icon')) {
				popup.classList.remove('active')
				popup.classList.remove('to-close')
				body.classList.remove('lock')
			} else if (!e.target.closest('.popup__body') && !e.target.closest('.popup__second-body')) {
				popup.classList.remove('active')
				popup.classList.remove('to-close')
				body.classList.remove('lock')
			}
			if (e.target.closest('.btnp')) {
				e.preventDefault()
				popup.classList.add('to-close')
			} else if (e.target.closest('.btnc')) {
				popup.classList.remove('active')
				popup.classList.remove('to-close')
				popup.classList.add('active')
			}
		}
		if (e.target.closest('button.btn')) {
			popup.classList.add('active')
			body.classList.add('lock')
			// body.removeEventListener('click', togglePopup)
		}

	}

})