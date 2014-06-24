/*
 * this module is used to control page showing effect
 *
 *
 */
(function($) {

    var _userInfo;

    //确保左右两个div等高	
    // var h1 = parseInt($('.div_left').css('height'));
    // var h2 = parseInt($('.div_right').css('height'));
    // var maxh = h1 > h2 ? h1 : h2;
    // $('.div_left').css('height', maxh + 'px');
    // $('.div_right').css('height', maxh + 'px');
    // 
    $('#gotoTop').on('click', function() {
        scroll(0, 0);
    });
    // 

    $('.div_menue ul li').hover(
        function() { //mouse enter
            if ($(this).attr('class') != 'currentpage') {
                $(this).css('background-image', 'url("/static/image/menue_bg.png")');
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

    $('#blog_login').on('click', function(evt) {
        $('#login_layer_default').attr('id', 'login_layer');
        $('#login_mask').fadeIn('slow');
    });

    $('.register_tab').on('click', function(evt) {
        $(this).addClass('li-selected');
        $('.login_tab').removeClass('li-selected');
        $('.login_btn').parent().before('<div id="confirm_pwd"><input type="password" placeholder="请确认密码" class="confirm_pwd"></div>');
        $('.login_btn').addClass('register_btn');
        $('.login_btn').removeClass('login_btn');
        $('.input_username').attr('class', 'registername');
        $('.register_btn').html('注册');
        $('.login-content').css('padding-top', '0px');
        $('#login_tip').html('');
    });

    $('.login_tab').on('click', function(evt) {
        $(this).addClass('li-selected');
        $('.register_tab').removeClass('li-selected');
        $('#confirm_pwd').remove();
        $('.register_btn').addClass('login_btn');
        $('.register_btn').removeClass('register_btn');
        $('.registername').attr('class', 'input_username');
        $('.login_btn').html('登录');
        $('.login-content').css('padding-top', '25px');
        $('#login_tip').html('');
    });

    $('.login_close').on('click', function() {
        $('#login_mask').fadeOut('slow');
        $('#login_layer').attr('id', 'login_layer_default');
    });

    function checkRegiste() {
        var username = $('.registername').val(),
            pwd = $('.input_password').val(),
            re_pwd = $('.confirm_pwd').val();
        if (pwd !== re_pwd) {
            $('#login_tip').html('两次密码输入不一致是闹哪样！');
            return;
        }

        if (username.length < 3) {
            $('#login_tip').html('用户名太短了');
            return;
        }

        // if (pwd.length < 6) {
        //     $('#login_tip').html('密码太短了');
        //     return;
        // }

        if (!username || !pwd || !re_pwd) {
            $('#login_tip').html('敢不敢把注册信息填完整');
            return;
        }

        // $('#login_tip').html('');

        $.ajax({
            url: '/blog/isuserexist',
            type: 'get',
            dataType: 'json',
            data: {
                username: username,
            },
            async: false,
            success: function(rsp) {
                if (!rsp.err && rsp.data) {
                    $('#login_tip').html('用户名已存在');
                } else {
                    $('#login_tip').html('');
                }
            }
        });
    }

    $('.login-content').on('click', '.register_btn', function() {
        var username = $('.registername').val(),
            pwd = $('.input_password').val(),
            re_pwd = $('.confirm_pwd').val();
        checkRegiste();
        if ($('#login_tip').html()) {
            return;
        }

        $.ajax({
            url: '/blog/register',
            type: 'post',
            dataType: 'json',
            data: {
                username: username,
                pwd: pwd
            },
            success: function(rsp) {
                if (rsp.err) {
                    $('#login_tip').html('注册失败，请重新注册');
                    return;
                }
                alert('注册成功，请登录');
                $('.login_tab').click();
            }
        });
    });

    $('.login-content').on('click', '.login_btn', function() {
        var username = $('.input_username').val(),
            pwd = $('.input_password').val();
        $.ajax({
            url: '/blog/login',
            type: 'get',
            dataType: 'json',
            data: {
                username: username,
                pwd: pwd
            },
            async: false,
            success: function(rsp) {
                if (!rsp.err) {
                    $('#login_tip').html('');
                    $('#blog_login').html(username);
                    $('#blog_login').unbind('click');
                    alert('登录成功');
                    $('.login_close').click();
                } else {
                    $('#login_tip').html(rsp.data);
                }
            }
        });
    });

    $('.login-content').on('blur', '.registername, .input_password, .confirm_pwd', function() {
        if ($(this).attr('class') == 'registername') {
            var username = $(this).val();
            if (username.length < 3) {
                $('#login_tip').html('用户名太短了');
                return;
            }
            $.ajax({
                url: '/blog/isuserexist',
                type: 'get',
                dataType: 'json',
                data: {
                    username: username,
                },
                async: false,
                success: function(rsp) {
                    if (!rsp.err && rsp.data) {
                        $('#login_tip').html('用户名已存在');
                    } else {
                        $('#login_tip').html('');
                    }
                }
            });
        }
    });

    //验证用户
    function validate(cb) {
        $.ajax({
            url: '/blog/validate',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(rsp) {
                if (rsp.err) {
                    cb(false);
                } else {
                    cb(rsp.data.isValid, rsp.data.userInfo);
                }
            }
        });
    }

    //加载指定类型的文章
    var loadPosts = (function() {

        var isFinish = false, //文章是否被拉完
            newestId = ''; //下次拉取的起点

        return function(count, cb) {
            if (isFinish) {
                return;
            }

            $.ajax({
                url: '/blog/getPosts',
                type: 'get',
                dataType: 'json',
                data: {
                    start: newestId,
                    count: count
                },
                async: true,
                success: function(rsp) {
                    if (rsp.err) {
                        alert('获取文章列表失败，请刷新页面');
                    } else {
                        var posts = rsp.data.posts;
                        if (posts.length == 0) {
                            isFinish = true;
                        } else {
                            //如果最近两次加载相同，则不再渲染
                            if (newestId == posts[posts.length - 1].id) {
                                return;
                            }
                            newestId = posts[posts.length - 1].id;
                        }
                        console.info(posts);
                        for (var i = 0; i < posts.length; i++) {
                            posts[i].tags = posts[i].tags.join(',');
                            posts[i].date = new Date(posts[i].time).Format('yyyy年MM月dd日');
                        }
                        $('#article-tmpl').tmpl({
                            posts: posts
                        }).appendTo('#postlist');
                    }
                    cb();
                }
            });
        };
    })();

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
        if (scrollTop >= 240) {
            $('.div_right').css('position', 'fixed');
            $('.div_right').css('top', '0px');
            $('.div_right').css('right', (document.body.clientWidth - 1040) / 2 + 'px');
        } else {
            $('.div_right').css('position', 'static');
        }
    };

    $(window).scroll(fixedRight);

    $(window).resize(fixedRight);

    $('#addpost_btn').on('click', function() {
        window.location.href = '/blog/newPost.html';
    });

    //初始化页面，获取用户权限信息
    (function init() {
        validate(function(isValid, userInfo) {
            _userInfo = userInfo; //内存中缓存用户信息
            if (isValid) {
                $('#blog_login').html(userInfo.username);
                $('#blog_login').unbind('click');
            }
            if (userInfo && userInfo.role == 'admin') {
                $('#addpost_btn').css('display', 'block');
            }
            //加载文章列表
            loadPosts(10, function(err, total, posts) {});
        });
    })();

})(jQuery);