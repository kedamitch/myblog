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
    var getPostById = function(postId, cb) {
        // $.ajax({
        //     url: '/blog/getPostById',
        //     type: 'get',
        //     dataType: 'json',
        //     data: {
        //         postId: postId
        //     },
        //     async: true,
        //     success: function(rsp) {
        //         if (rsp.err) {
        //             alert('获取文章失败，请刷新页面');
        //         } else {
        //             var postobj = rsp.data;
        //             $('#article-tmpl').tmpl({
        //                 posts: [postobj]
        //             }).appendTo('#postlist');
        //             cb();
        //         }
        //     }
        // });
        var postData = JSON.parse($("#postData").text());
        $('#article-tmpl').tmpl({
            posts: [postData]
        }).appendTo('#postlist');
        cb();
    };

    function addViewCount(postId) {
        $.ajax({
            url: '/blog/view',
            type: 'get',
            dataType: 'json',
            data: {
                postId: postId
            },
            async: true,
            success: function(rsp) {
                console.info(rsp);
            }
        });            
    }

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
            //加载分类信息
            loadCates(null);            

            //加载文章列表
            var url = window.location.href;
            var postId = url.replace(/.*postId=(\d+)$/, "$1");

            addViewCount(postId);

            getPostById(postId, function() {
                if (userInfo && userInfo.role == 'admin') {
                    $('.span_atc_edit').css('display', 'block');
                }                
            });
        });
    })();

})(jQuery);