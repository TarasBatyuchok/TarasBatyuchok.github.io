
const navSlider = () => {
	const burger = document.querySelector(".burger");
	const nav = document.querySelector(".nav-links");
	const navLinks = document.querySelectorAll(".nav-links li");
	// toggle Nav
	burger.addEventListener("click", () => {
		nav.classList.toggle("nav-active");


		//Animate links
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = "";
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5
					}s`;
			}
		});
		// burger animation
		burger.classList.toggle('toggle');
	});


};

navSlider();


window.onload = function () {

	let preloader = document.getElementById("preloader");
	preloader.style.display = "none";


};



$(document).ready(function () {
	// $('#consultation-form').validate();

	// $('.button').on('click',function(){
	//     $('.overlay, #thanks').fadeIn('slow');
	// });

	$('.modal__close').on('click', function () {
		$('.overlay, #thanks').fadeOut('slow');
	})

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
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символов!")
				},
				phone: "Пожалуста, введите свой номер телефона",
				email: {
					required: "Пожалуста, введите свой почту",
					email: "Неправильно введен адрес почты"
				}
			}
		});
	};

	valideForms('#consultation-form');

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

			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

});


