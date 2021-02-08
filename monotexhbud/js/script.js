
const navSlider = () => {
	const burger = document.querySelector(".burger");
	const nav = document.querySelector(".nav-links");
	const navLinks = document.querySelectorAll(".nav-links li");
	// toggle Nav
	burger.addEventListener("click", () => {
		nav.classList.toggle("nav-active");


		//Animate links
		// navLinks.forEach((link, index) => {
		// 	if (link.style.animation) {
		// 		link.style.animation = "";
		// 	} else {
		// 		link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5
		// 			}s`;
		// 	}
		// });
		// burger animation
		burger.classList.toggle('toggle');
	});

	nav.addEventListener("click", () => {
		
		nav.classList.remove("nav-active")
		burger.classList.remove('toggle');

		
	});

	


};

navSlider();


window.onload = function () {

	let preloader = document.getElementById("preloader");
	preloader.style.display = "none";


};



$(document).ready(function () {
	// $('#consultation-form').validate();




	$('.modal__close').on('click', function () {
		$('.overlay, #thanks, #order' ).fadeOut('slow');
	})
	// modal
	// $('.dws').on('click',function(){
	// 	$('.overlay, #order').fadeIn('slow');
	// });

	$('.blocImg').each(function(i){
		$(this).on('click', function(){
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 4
				},

				phone: "required",

				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символов!")
				},
				phone: "Введите свой номер телефона",
				email: {
					required: "Введите свою почту",
					email: "Неправильно введен адрес почты"
				}
			}
		});
	};

	valideForms('#consultation-form');
	valideForms('#order form');

	$('input[name=phone]').mask("+38(999) 999-99-99")

	$('form').submit(function (e) {
		e.preventDefault();
		if (!$(this).valid()) {
			return;
		}
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");


			$('.overlay, #order').fadeOut('slow');
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

// nav
	$('.slide-section').click(function(e){
		
		let linkHref = $(this).attr('href')
		
		$('html, body').animate({
			scrollTop: $(linkHref).offset().top
		});


		e.preventDefault();
	});


	

	var arrLang={
		'ru':{
			'home':	'Главная',
			'about': 'О нас',
			'services': 'Услуги',
			'contact': 'Контакты',
			'about-us': 'Наша компания предлагает качественные услуги по диагностике, ремонту, реконструкции и обслуживания подъемных механизмов.(Индивидуальный подход к каждому клиенту)',
			'btn': 'консультация',
			'free-cons': ' Получите бесплатную консультацию по ремонту вашей техники',
			'simple-form': ` Заполните форму заявки 
			и мы передзвоним вам в течение 10 мин.`,
			'order':'Заказать консультацию',
			'about-monotech':'МоноТеxБуд это',
			'box_one':`Индивидуальный подход к каждого клиента`,
			'box_two':'Более 50 успешных проектов',
			'box_three':'200 единиц отремонтированной техники',
			'box_four':'Максимально быстрый срок выполнения заказа',
			'box_five':'Лояльная ценовая политика',
			'box_six':'Коллектив профессионалов который готов ко всем задачам',
			'expert':'Предоставляем услуги',
			'h3-two':'Реставрацыя',
			'h3-three':'Ремонт мостовых кранов',
			'h3-four':'Ремонт автокранов',
			'h3-five':'Ремонт автовышек',
			'h3-six':'Ремонт козловых кранов',
			'city':'Львов ул.Бескидська №37',
			'time':'время роботи',
			'thanks':'Спасибо за вашу заявку',
			'meneger':'Наш менеджер свяжеться с вами в ближайшее время!',
			'interested':'Вас интересует:',
		},	

		'ua': {
			'home':	'Головна',
			'about': 'Про нас',
			'services': 'Послуги',
			'contact': 'Контакти',
			'about-us': 'Наша компанія пропонує якісні послуги з діагностики, ремонту, реконструкції та обслуговування підіймальних механізмів.(Індивідуальний підхід до кожного клієнта)',
			'btn': 'консультація',
			'free-cons': 'Отримайте безкоштовну консультацію по ремонту вашої техніки',
			'simple-form': ` Просто заповніть форму заявки  
			і ми передзвонимо вам за 10 хв.`,
			'order':'Замовити консультацію',
			'about-monotech':'МоноТеxБуд це',
			'box_one':'Індивідуальний підхід до кожного клієнта',
			'box_two':'Більше 50 успішних проектів',
			'box_three':'200 одиниць відремонтованої техніки',
			'box_four':'Максимально швидкий термін виконаня замовленя',
			'box_five':'Лояльна цінова політика',
			'box_six':'Колектив професіоналів який готовий до усіх завдань',
			'expert':'Надаємо послуги',
			'h3-two':'Реставрація',
			'h3-three':'Ремонт мостових кранів',
			'h3-four':'Ремонт автокранів',
			'h3-five':'Ремонт автовишок',
			'h3-six':'Ремонт козлових кранів',
			'city':'Львів вул.Бескидська №37',
			'time':'час роботи',
			'thanks':'Дякую за вашу заявку',
			'meneger':'Наш менеджер свяжеться з вами в найближчий час!',
			'interested':'Ваc цікавить:',
		},
		
		
	}

	$(function(){
		$('.translate').click(function(){
			var lang =jQuery(this).attr("id");

			$('.lang').each(function(index, item){
				$(this).text(arrLang[lang][$(this).attr('key')]);
			})
		})
	});

});


