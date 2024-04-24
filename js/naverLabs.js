var swiper1 = new Swiper('.swipe1', {
    scrollbar: {
        el: '.swiper-scrollbar',
        type: 'progressbar',
    },
    autoplay: { delay: 2000, },
});

$(document).ready(function () {
    //리사이징 할때마다 스와이퍼 새로고침
    $(window).resize(function () {
        swiper1.update();
    });
    $(".scroll").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
    $(".mmenu").click(function () {
        $(".menu").addClass("on");
    });
    $(".mclose").click(function () {
        $(".menu").removeClass("on");
    });
});
