package blog.dao;


import java.util.List;

import blog.bean.ArticleBean;

public interface ArticleDao {
	
	//获取本文章的完全内容，不获取简要内容
	public ArticleBean getFullArticleById(long articleId);
	
	//获取给定分类下最新文章列表,start 起始位置，end 结束位置
	//不获取完全内容
	public List<ArticleBean> getBriefArticleList(int cateId, int start, int num);
	
	//返回article id
	public long saveArticle(ArticleBean article);
	
	//修改文章
	public void modifyArticle(ArticleBean article);
}