var swiper1 = new Swiper('.swipe1', {
    scrollbar: {
        el: '.swiper-scrollbar',
        type: 'progressbar',
    },
    autoplay: { delay: 2000, },
});

let gnb = document.querySelector('.menu');
let menuButton = document.querySelector('.mmenu');
menuButton.addEventListener('click', function () {
    gnb.classList.add("on");
});
let closeButton = document.querySelector('.mclose');
closeButton.addEventListener('click', function () {
    gnb.classList.remove("on");
});


$(document).ready(function () {
    $(".scroll").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});
