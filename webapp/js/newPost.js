/*
 * this module is used to control page showing effect
 *
 *
 */
(function($) {

    var _userInfo;

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

    $('#submitPost').on('click', function() {
        var title = $('#post_title').val(),
            tags = $('#post_tags').val(),
            cate = $('#cate_selector').val();
        console.info(title);
        console.info(tags);
        console.info(cate);
        var content = ueditor.getContent();
        var abstract = ueditor.getContentTxt();

        if (!title || !cate || !content) {
            alert('请输入完整文章信息');
            return;
        }
        $.ajax({
            url: '/blog/pubPost',
            type: 'post',
            dataTypeT: 'json',
            data: {
                title: title,
                content: content,
                abstract: abstract,
                tags: tags,
                cate: cate
            },
            success: function(rsp) {
                if (rsp.err) {
                    alert('发布文章失败');
                    console.error(rsp.data);
                } else {
                    alert('发布成功');
                    window.location.href = '/blog/index.html';
                }
            }
        });

    });

    //初始化页面，获取用户权限信息
    (function init() {
        validate(function(isValid, userInfo) {
            console.info(isValid);
            console.info(userInfo);
            if (!isValid) {
                alert('你没有权限发帖');
                window.location.href = '/blog/index.html';
                return;
            } else if (userInfo && userInfo.role !== 'admin') {
                alert('你没有权限发帖');
                window.location.href = '/blog/index.html';
                return;
            }

            _userInfo = userInfo; //内存中缓存用户信息
            if (isValid) {
                $('#blog_login').html(userInfo.username);
                $('#blog_login').unbind('click');
            }

            //加载分类信息
            loadCates(null, function(cateList) {
                for(var i = 0; i < cateList.length; i++) {
                    $("#cate_selector").append($('<option value="' + cateList[i].key + '">' + cateList[i].name + '</option>'))
                }
            });            
        });
    })();

})(jQuery);