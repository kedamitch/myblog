#create basic table from blog system
create database blogDB;

#create user passport table, this table save user account information
create table blog_passport (
	userId INTEGER auto_increment,
	email VARCHAR(100) NOT NULL unique,
	userName VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	lastLogin DATETIME NOT NULL default '1970-01-01 00:00:00',
	deleted TINYINT default 0,
	primary key(userId)
) ENGINE=InnoDB;

#create article category table
create table blog_article_cate (
	cateId Integer auto_increment,
	parentId Integer NOT NULL,
	categoryName VarChar(100) NOT NULL,
	articleNum Integer NOT NULL default 0,
	deleted TinyInt default 0,
	primary key(cateId)
) ENGINE=INNODB;

#insert root item into category table
insert into blog_article_cate (parentId, categoryName) values(1,'root');

#article 1:n article_cate
#create article table

