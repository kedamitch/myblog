package blog.bean;

public class CategoryBean {

	private int cateId;
	private int parentId;
	private String categoryName;
	private long articleNum;

	public int getCateId() {
		return cateId;
	}

	public void setCateId(int cateId) {
		this.cateId = cateId;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public long getArticleNum() {
		return articleNum;
	}

	public void setArticleNum(long articleNum) {
		this.articleNum = articleNum;
	}

}