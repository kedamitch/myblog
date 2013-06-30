package blog.dao;

import java.util.List;
import java.util.Map;

import blog.bean.TagBean;

public interface TagDao {
	
	public List<TagBean> getTagList();
	
	public Map<String, Boolean> checkExistence(List<String> tagNameList);
	
	public int createTag(String tagName);
	
	public int incTagCount(int num);
	
	public int decTagCount(int num);
	
}