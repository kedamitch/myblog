package blog.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

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
		return arBean;
	}

	public List<ArticleBean> getBriefArticleList(final int cateId,final int start,final int num) {
		String sql = "select at.articleId, at.userId, pa.userName, at.title, at.briefcontent," +
				" at.cateId, at.tags, at.createTime, hit.viewCount, hit.commentCount from blog_article at " +
				" left join blog_passport pa on at.userId=pa.userId" +
				" left join blog_hits hit on at.article=hit.articleId" +
				" where deleted=0 and at.cateId=? order by createTime desc limit ?, ?";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, cateId);
				ps.setInt(2, start);
				ps.setInt(3, num);
			}
		};
		ResultSetExtractor<List<ArticleBean>> rse = new ResultSetExtractor<List<ArticleBean>>() {

			public List<ArticleBean> extractData(ResultSet rs) throws SQLException,
					DataAccessException {
				List<ArticleBean> artList = new ArrayList<ArticleBean>();
				while(rs.next()) {
					ArticleBean artBean = new ArticleBean();
					artBean.setArticleId(rs.getLong("articleId"));
					artBean.setUserId(rs.getInt("userId"));
					artBean.setAuthorName(rs.getString("userName"));
					artBean.setTitle(rs.getString("title"));
					artBean.setContent(rs.getString("briefcontent"));
					artBean.setCateId(rs.getInt("cateId"));
					artBean.setTagsStr(rs.getString("tags"));
					artBean.setCreateTime(rs.getDate("createTime"));
					artBean.setViewNum(rs.getLong("viewCount"));
					artBean.setCommentNum(rs.getLong("commentCount"));
					artList.add(artBean);
				}
				return artList;
			}
			
		};
		List<ArticleBean> articleList = this.jdbcTemplate.query(sql, pss, rse);
		return articleList;
	}
	
	public Map<Long, String> getLatestArticle(final int num) {
		String sql = "select articleId, title from blog_article "
				+ " where deleted=0 order by createTime desc limit 0, ?";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, num);
			}
		};
		ResultSetExtractor<Map<Long, String>> rse = new ResultSetExtractor<Map<Long,String>>() {

			public Map<Long, String> extractData(ResultSet rs)
					throws SQLException, DataAccessException {
				Map<Long, String> map = new LinkedHashMap<Long, String>();
				while(rs.next()) {
					map.put(rs.getLong("articleId"), rs.getString("title"));
				}
				return map;
			}
		};
		Map<Long, String> map = this.jdbcTemplate.query(sql, pss, rse);
		return map;
	}

	public long saveArticle(final ArticleBean article) {
		final String sql = "insert into blog_article(userId, title, content, briefcontent, "
				+ " cateId, tags, createTime) values(?,?,?,?,?,?,now())";
		KeyHolder keyHolder = new GeneratedKeyHolder();
		PreparedStatementCreator psc = new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection conn)
					throws SQLException {
				//系统自动识别自增key
				//PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
				//人工输入要返回的列名
				PreparedStatement ps = conn.prepareStatement(sql, new String[]{"articleId"});
				ps.setInt(1, article.getUserId());
				ps.setString(2, article.getTitle());
				ps.setString(3, article.getContent());
				ps.setString(4, article.getBriefcontent());
				ps.setInt(5, article.getCateId());
				ps.setString(6, article.getTagsStr());
				return ps;
			}
		};
		this.jdbcTemplate.update(psc, keyHolder);
		return keyHolder.getKey().longValue();
	}

	public int modifyArticle(final ArticleBean article) {
		String sql = "update blog_article set userId=?, title=?, content=?, briefcontent=?,"
				+ " cateId=?, tags=?, modefiedTime=now() where articleId=? and deleted=0";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, article.getUserId());
				ps.setString(2, article.getTitle());
				ps.setString(3, article.getContent());
				ps.setString(4, article.getBriefcontent());
				ps.setInt(5, article.getCateId());
				ps.setString(6, article.getTagsStr());
				ps.setLong(7, article.getArticleId());
			}
		};
		int changeNum = this.jdbcTemplate.update(sql, pss);
		return changeNum;
	}
	
	public int deleteArticle(final long articleId) {
		String sql = "update blog_article set deleted=1 where articleId=?";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setLong(1, articleId);
			}
		};
		return this.jdbcTemplate.update(sql, pss);
	}

	
}