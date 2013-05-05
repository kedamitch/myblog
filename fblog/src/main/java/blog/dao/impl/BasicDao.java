package blog.dao.impl;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public abstract class BasicDao {
	
	protected JdbcTemplate jdbcTemplate;
	
	protected NamedParameterJdbcTemplate namedJdbcTemplate;

	@Autowired
	public void setJdbcTemplate(@Qualifier("datasource")DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Autowired
	public void setNamedJdbcTemplate(@Qualifier("datasource")DataSource dataSource) {
		this.namedJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}
}