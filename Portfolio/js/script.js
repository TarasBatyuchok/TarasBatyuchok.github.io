const hamburger =document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click',() =>{
    menu.classList.add('active');
});


closeElem.addEventListener('click', () =>{
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__ratings-counter'),
        lines =document.querySelectorAll('.skills__ratings-line span');


counters.forEach( (value,index) =>{
    lines[index].style.width = value.innerHTML;
});