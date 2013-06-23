package blog.dao.impl;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.ResultSetExtractor;

import blog.bean.ArticleBean;
import blog.dao.ArticleDao;

public class ArticleDaoImpl extends BasicDao implements ArticleDao {

	public ArticleBean getFullArticleById(final long articleId) {
		String sql = "select at.articleId, at.userId, pa.userName, at.title, at.content," +
				" at.cateId, ac.categoryName,at.tags, at.createTime, hit.viewCount, hit.commentCount from blog_article at " +
				" left join blog_passport pa on at.userId=pa.userId" +
				" left join blog_article_cate ac on at.cateId=ac.cateId" +
				" left join blog_hits hit on at.article=hit.articleId" +
				" where articleId=? and deleted=0";
		
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setLong(1, articleId);
			}
		};
		
		ResultSetExtractor<ArticleBean> rsExtractor = new ResultSetExtractor<ArticleBean>() {

			public ArticleBean extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				ArticleBean artBean = new ArticleBean();
				artBean.setArticleId(rs.getLong("articleId"));
				artBean.setUserId(rs.getInt("userId"));
				artBean.setAuthorName(rs.getString("userName"));
				artBean.setTitle(rs.getString("title"));
				artBean.setContent(rs.getString("content"));
				artBean.setCateId(rs.getInt("cateId"));
				artBean.setCateName(rs.getString("categoryName"));
				artBean.setTagsStr(rs.getString("tags"));
				artBean.setCreateTime(rs.getDate("createTime"));
				artBean.setViewNum(rs.getLong("viewCount"));
				artBean.setCommentNum(rs.getLong("commentCount"));
				return artBean;
			}
		};
		ArticleBean arBean = this.jdbcTemplate.query(sql, pss, rsExtractor);
		return null;
	}

	public List<ArticleBean> getBriefArticleList(int cateId, int start, int num) {
		String sql = "select "
		return null;
	}

	public long saveArticle(ArticleBean article) {
		// TODO Auto-generated method stub
		return 0;
	}

	public void modifyArticle(ArticleBean article) {
		// TODO Auto-generated method stub
		
	}
	
	
}