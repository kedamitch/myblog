(function($) {

    //date format 方法
    Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    $('#gotoTop').on('click', function() {
        scroll(0, 0);
    });
    // 

    $('.div_menue ul li').hover(
        function() { //mouse enter
            if ($(this).attr('class') != 'currentpage') {
                $(this).css('background-color', '#7d4a2b');
            }
        },
        function() { //mouse leave
            if ($(this).attr('class') != 'currentpage') {
                $(this).css('background-color', '#999966');
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

    var fixedRight = function(e) {
        var marginBot = 0,
            scrollTop = 0;
        if (document.compatMode === "CSS1Compat") {
            marginBot = document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.body.scrollTop) - document.documentElement.clientHeight;
            scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
        } else {
            marginBot = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight;
            scrollTop = document.body.scrollTop;
        }
        if (scrollTop >= 400) {
            $('.div_right').css('position', 'fixed');
            $('.div_right').css('top', '0px');
            $('.div_right').css('right', (document.body.clientWidth - 1040) / 2 + 'px');
        } else {
            $('.div_right').css('position', 'static');
        }
    };

    $(window).scroll(fixedRight);

    $(window).resize(fixedRight);

})(jQuery);