package blog.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import blog.bean.CategoryBean;
import blog.dao.CategoryDao;

public class CategoryDaoImpl extends BasicDao implements CategoryDao {

	public List<CategoryBean> getCateList() {
		String sql = "select * from blog_article_cate where deleted=0 and parentId=0 order by cateId asc";
		ResultSetExtractor<List<CategoryBean>> rse = new ResultSetExtractor<List<CategoryBean>>() {

			public List<CategoryBean> extractData(ResultSet rs)
					throws SQLException, DataAccessException {
				List<CategoryBean> list = new ArrayList<CategoryBean>();
				while(rs.next()) {
					CategoryBean bean = new CategoryBean();
					bean.setCateId(rs.getInt("cateId"));
					bean.setParentId(rs.getInt("parentId"));
					bean.setCategoryName(rs.getString("categoryName"));
					bean.setArticleNum(rs.getLong("articleNum"));
					list.add(bean);
				}
				return list;
			}
		};
		return this.jdbcTemplate.query(sql, rse);
	}
	
}