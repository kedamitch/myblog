package blog.dao.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

import blog.dao.HitCountDao;

public class HitCountDaoImpl extends BasicDao implements HitCountDao {

	public int initHitCount(final long articleId) {
		String sql = "insert into blog_hits(articleId, viewCount, commentCount) values(?, 0, 0)";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setLong(1, articleId);
			}
		};
		return this.jdbcTemplate.update(sql, pss);
	}

	public int incViewCount(final long articleId, final int num) {
		String sql = "update blog_hits set viewCount = viewCount + ? where articleId=?";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, num);
				ps.setLong(2, articleId);
			}
		};
		return this.jdbcTemplate.update(sql, pss);
	}

	public int incCommentCount(final long articleId, final int num) {
		String sql = "update blog_hits set commentCount = commentCount + ? where articleId=?";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, num);
				ps.setLong(2, articleId);
			}
		};
		return this.jdbcTemplate.update(sql, pss);
	}

	public int decCommentCount(final long articleId, final int num) {
		String sql = "update blog_hits set commentCount = commentCount - ? where articleId=?";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setInt(1, num);
				ps.setLong(2, articleId);
			}
		};
		return this.jdbcTemplate.update(sql, pss);
	}
	
	
	
	
}