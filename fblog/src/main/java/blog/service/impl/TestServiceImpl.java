package blog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import blog.dao.TestDao;
import blog.service.TestService;

@Service("testServiceImpl")
public class TestServiceImpl implements TestService {
	
	@Autowired
	@Qualifier("testDao")
	private TestDao testDao;

	public String testDB() {
		return testDao.TestDB();
	}
	
}