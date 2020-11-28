// burger-menu
window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        header.classList.toggle('header_active');
        hamburger.classList.toggle('hamburger_active');
    });

});
// carousel
$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                    // autoplay: true,
                    // autoplaySpeed: 2000,
                    centerPadding: '40px',
                }
            },
            {
                breakpoint:375,
                settings:{
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true,
                }
            } 
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)',
        function () {
            $(this)
                .addClass('catalog__tab_active')
                .siblings()
                .removeClass('catalog__tab_active')
                .closest('div.container')
                .find('div.catalog__content')
                .removeClass('catalog__content_active')
                .eq($(this).index())
                .addClass('catalog__content_active');
        });
    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link')
    toggleSlide('.catalog-item__back')


    // $('.catalog-item__back').each(function(i){
    //     $(this).on('click', function(e){
    //         e.preventDefault();
    //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
    //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     })
    // })

    // Modal
    // consultation
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    // --------------------------------
    // $('.button_mini').on('click',function(){
    //     $('.overlay,#order').fadeIn('slow');
    // });
    //--------------------------------- 
    $(".button_mini").each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay ,#order').fadeIn('slow');
        })
    })

    // validation-form

    function valideForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
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
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+(380) 99-99-99-999")

    $('form').submit(function(e) {
        e.preventDefault();
        if(!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Smoth scroll and pageup

    $(window).scroll(function() {
        if($(this).scrollTop() >1600) {
            $('.pageup').fadeIn();
        }else{
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();

});

// smooth scroll
$(function(){
    $("a[href=#up]").click(function(){
            var _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
    });
});






