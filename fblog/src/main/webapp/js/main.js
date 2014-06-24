/*
 * this module is used to control page showing effect
 *
 *
 */
(function($) {
    //确保左右两个div等高	
    var h1 = parseInt($('.div_left').css('height'));
    var h2 = parseInt($('.div_right').css('height'));
    var maxh = h1 > h2 ? h1 : h2;
    $('.div_left').css('height', maxh + 'px');
    $('.div_right').css('height', maxh + 'px');

    $('.div_menue ul li').hover(
        function() { //mouse enter
            if ($(this).attr('class') != 'currentpage') {
                $(this).css('background-image', 'url("../image/menue_bg.png")');
            }
        },
        function() { //mouse leave
            if ($(this).attr('class') != 'currentpage') {
                $(this).css('background-image', 'none');
            }
        }
    );

    $('.package li , .lastest_art li').hover(
        function() { //mouse enter
            $(this).css('background-color', '#AAAAAA');
            $(this).children('a').css('color', 'white');
        },
        function() { //mouse leave
            $(this).css('background-color', 'transparent');
            $(this).children('a').css('color', '#555');
        }
    );

    $('.taglist a').hover(
        function() {
            var fsize = parseInt($(this).css('font-size'));
            $(this).css('font-size', (fsize + 2) + 'px');

        },
        function() {
            var fsize = parseInt($(this).css('font-size'));
            $(this).css('font-size', (fsize - 2) + 'px');
        }
    );

    $('.pagebar a').hover(
        function() {
            $(this).css('background-color', '#FF7744');
            $(this).css('color', 'white');
            $(this).css('font-size', '18px');
            $(this).css('margin-right', '8px');
        },
        function() {
            $(this).css('background-color', 'white');
            $(this).css('color', '#555');
            $(this).css('font-size', '14px');
            $(this).css('margin-right', '10px');
        }
    );

})(jQuery);