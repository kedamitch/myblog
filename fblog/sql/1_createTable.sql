#create basic table from blog system
create database blogDB character set 'utf8' collate 'utf8_general_ci';

#create user passport table, this table save user account information
create table blog_passport (
	userId INTEGER auto_increment,
	email VARCHAR(100) NOT NULL unique,
	userName VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	lastLogin DATETIME NOT NULL default '1970-01-01 00:00:00',
	deleted TINYINT default 0,
	primary key(userId)
) ENGINE=InnoDB default charset=utf8;

#create article category table
#articleNum is updated by trigger
create table blog_article_cate (
	cateId Integer auto_increment,
	parentId Integer NOT NULL,
	categoryName VarChar(100) NOT NULL,
	articleNum Integer NOT NULL default 0,
	deleted TinyInt default 0,
	primary key(cateId)
) ENGINE=INNODB default charset=utf8;

#insert root item into category table
insert into blog_article_cate (parentId, categoryName) values(1,'root');
insert into blog_article_cate (parentId, categoryName) values(1,'未分类');
#article 1:n article_cate
#create article table
create table blog_article (
	articleId Integer auto_increment,
	userId Integer NOT NULL,
	title VarChar(255) NOT NULL,
	content LongText,
	briefcontent LongText,
	cateId Integer NOT NULL,
	tags VarChar(255) NOT NULL default '',
	createTime DateTime NOT NULL default '1970-01-01 00:00:00',
	modifiedTime DateTime NOT NULL default '1970-01-01 00:00:00',
	deleted Tinyint NOT NULL default 0,
	primary key(articleId)
) ENGINE=INNODB default charset=utf8;

#create article tag table
create table blog_tags_artc (
	Id VarChar(255) NOT NULL,
	articleId Integer NOT NULL,
	tagId Integer NOT NULL,
	primary key(Id)
) ENGINE=INNODB default charset=utf8;

create table blog_tags (
	tagId Integer auto_increment,
	tagName VarChar(255) NOT NULL,
	articleNum Integer NOT NULL default 0,
	deleted Tinyint NOT NULL default 0,
	primary key(tagId)
) ENGINE=INNODB default charset=utf8;


#create index on article table
create index articleIndex on blog_article (userId, cateId);

#create hits count table
create table blog_hits (
	articleId Integer,
	viewCount BigInt NOT NULL default 0,
	commentCount BigInt NOT NULL default 0,
	primary key(articleId)
)ENGINE=INNODB default charset=utf8;

#create blog comments table,userId can be null because of non-login user
#userName can not be null
create table blog_comment (
	commentId Integer auto_increment,
	userId Integer,
	userName VarChar(50) NOT NULL,
	articleId Integer NOT NULL,
	content Text NOT NULL,
	createTime DateTime NOT NULL default '1970-01-01 00:00:00',
	deleted Tinyint default 0,
	primary key(commentId)
)ENGINE=INNODB default charset=utf8;

create index commentIndex on blog_comment (userID,articleId);


