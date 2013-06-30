package blog.dao;

import java.util.List;

import blog.bean.CommentBean;


public interface CommentDao {
	
	//获取给定文章的评论
	public List<CommentBean> getCommentList(long articleId, int start, int num);
	
	//保存评论,返回评论id
	public long saveComment(CommentBean comment);
	
	//删除评论
	public int delComment(long commentId);
	
}