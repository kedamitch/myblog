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
        var content = ueditor.getContent();
        var abstract = ueditor.getContentTxt();

        if (!title || !cate || !content) {
            alert('请输入完整文章信息');
            return;
        }
        $.ajax({
            url: '/blog/editPost',
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
                    alert('修改文章失败');
                    console.error(rsp.data);
                } else {
                    alert('修改成功');
                    window.location.href = '/blog/index.html';
                }
            }
        });

    });

    //初始化页面，获取用户权限信息
    (function init() {
        validate(function(isValid, userInfo) {
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
			loadCates(null, function(cateList) {
                for(var i = 0; i < cateList.length; i++) {
                    $("#cate_selector").append($('<option value="' + cateList[i].key + '">' + cateList[i].name + '</option>'))
                }
            });            
            //加载指定文章信息
            var postId = window.location.href.replace(/.*postId=(\d+)$/, "$1");
            if(postId) {
            	$.ajax({
            		url: "/blog/getPostById",
            		type: "get",
            		dataType: "json",
            		async: "true",
            		data: {
            			postId: postId
            		},
            		success: function(rsp) {
            			if(rsp.err) {
            				alert("获取文章信息失败");
            			} else {
            				var articleObj = rsp.data;
							$('#post_title').val(articleObj.title);
            				$('#post_tags').val(articleObj.tags.join(","));
							window.ueditor = UE.getEditor('container');
						    ueditor.ready(function() {
						     	ueditor.setContent(articleObj.content);
						 	});            				
        					$('"#cate_selector option[value="' + articleObj.cate + '"]"').attr('selected', 'true');
            			}
            		}
            	});
            } else {
            	alert("文章不存在");
            }    
        });
    })();

})(jQuery);