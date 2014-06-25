(function($) {

    var _userInfo;

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
                    if (rsp.data && rsp.data.role == 'admin') {
                        $('#addpost_btn').css('display', 'block');
                    }
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

})(jQuery);