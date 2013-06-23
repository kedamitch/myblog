package blog.bean;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 
 * @author fatfei
 * 
 */

public class ArticleBean {
	private long articleId;
	private String authorName;
	private int userId;
	private String title;
	private String content;
	private String briefcontent;
	private String cateName;
	private int cateId;
	private String tagsStr;
	private List<Integer> tagList;
	private Date createTime;
	private long viewNum;
	private long commentNum;

	public String getBriefcontent() {
		return briefcontent;
	}

	public void setBriefcontent(String briefcontent) {
		this.briefcontent = briefcontent;
	}

	public long getArticleId() {
		return articleId;
	}

	public void setArticleId(long articleId) {
		this.articleId = articleId;
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCateName() {
		return cateName;
	}

	public void setCateName(String cateName) {
		this.cateName = cateName;
	}

	public int getCateId() {
		return cateId;
	}

	public void setCateId(int cateId) {
		this.cateId = cateId;
	}

	public String getTagsStr() {
		return tagsStr;
	}

	public void setTagsStr(String tagsStr) {
		this.tagsStr = tagsStr;
	}

	public List<Integer> getTagList() {
		return tagList;
	}

	public void setTagList(List<Integer> tagList) {
		this.tagList = tagList;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public long getViewNum() {
		return viewNum;
	}

	public void setViewNum(long viewNum) {
		this.viewNum = viewNum;
	}

	public long getCommentNum() {
		return commentNum;
	}

	public void setCommentNum(long commentNum) {
		this.commentNum = commentNum;
	}

	public String getCreateDateStr() {
		if (createTime == null)
			return "1970年01月01日";
		DateFormat df = new SimpleDateFormat("yyyy年MM月dd日");
		return df.format(createTime);
	}

}