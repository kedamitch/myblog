package blog.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import blog.bean.CommentBean;
import blog.dao.CommentDao;

public class CommentDaoImpl extends BasicDao implements CommentDao {

	public List<CommentBean> getCommentList(final long articleId, final int start, final int num) {
		String sql = "select * from blog_comment where articleId=? and deleted=0 order by createTime desc limit ?,?";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setLong(1, articleId);
				ps.setInt(2, start);
				ps.setInt(3, num);
			}
		};
		ResultSetExtractor<List<CommentBean>> rse = new ResultSetExtractor<List<CommentBean>>() {

			public List<CommentBean> extractData(ResultSet rs)
					throws SQLException, DataAccessException {
				List<CommentBean> commList = new ArrayList<CommentBean>();
				while(rs.next()) {
					CommentBean comm = new CommentBean();
					comm.setArticleId(articleId);
					comm.setCommentId(rs.getLong("commentId"));
					comm.setUserId(rs.getLong("userId"));
					comm.setUserName(rs.getString("userName"));
					comm.setContent(rs.getString("content"));
					comm.setCreateTime(rs.getDate("createTime"));
					commList.add(comm);
				}
				return commList;
			}
		};
		return this.jdbcTemplate.query(sql, pss, rse);
	}

	public long saveComment(final CommentBean comment) {
		final String sql = "insert into blog_comment(userId, userName, articleId, content, createTime) "
				+ " values(?,?,?,?,now())";
		KeyHolder keyHolder = new GeneratedKeyHolder();
		PreparedStatementCreator psc = new PreparedStatementCreator() {
			
			public PreparedStatement createPreparedStatement(Connection conn)
					throws SQLException {
				PreparedStatement ps = conn.prepareStatement(sql, new String[]{"commentId"});
				ps.setLong(1, comment.getUserId());
				ps.setString(2, comment.getUserName());
				ps.setLong(3, comment.getArticleId());
				ps.setString(4, comment.getContent());
				return ps;
			}
		};
		this.jdbcTemplate.update(psc, keyHolder);
		return keyHolder.getKey().longValue();
	}

	public int delComment(final long commentId) {
		String sql = "update blog_comment set deleted=1 where articleId=? and deleted=0";
		PreparedStatementSetter pss = new PreparedStatementSetter() {
			
			public void setValues(PreparedStatement ps) throws SQLException {
				ps.setLong(1, commentId);
			}
		};
		int effectNum = this.jdbcTemplate.update(sql, pss);
		return effectNum;
	}
	
}