package blog.dao.impl;

import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import blog.dao.TestDao;

@Repository("testDao")
public class TestDaoImpl extends BasicDao implements TestDao {

	public String TestDB() {
		String sqlString = "select * from blog_article_cate where cateId=2";
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sqlString);
		if(rs.next()) {
			return rs.getString("categoryName");
		}
		return null;
	}
	
}