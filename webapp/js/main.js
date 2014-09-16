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
    var loadPosts = (function() {

        var isFinish = false, //文章是否被拉完
            newestId = ''; //下次拉取的起点

        return function(count, cate, cb) {
            if (isFinish) {
                return;
            }

            $.ajax({
                url: '/blog/getPosts',
                type: 'get',
                dataType: 'json',
                data: {
                    start: newestId,
                    count: count,
                    cate: cate
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
                $('.span_atc_edit').css('display', 'block');
            }

            var matchs = window.location.href.match(/.*[?&]cate=([^&]+).*/);
            if(matchs && matchs[1]) {
                var cate = matchs[1];
            }

            //加载分类信息
            loadCates(cate);
            //加载文章列表
            loadPosts(10, cate, function(err, total, posts) {});
        });
    })();

})(jQuery);