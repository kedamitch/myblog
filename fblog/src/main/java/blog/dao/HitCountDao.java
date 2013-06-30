package blog.dao;

import blog.bean.HitCountBean;

public interface HitCountDao {
	
	public int initHitCount(long articleId);
	
	public int incViewCount(long articleId, int num);
	
	public int incCommentCount(long articleId, int num);
	
	public int decCommentCount(long articleId, int num);
	
}