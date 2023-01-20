CREATE DATABASE howdo;
USE howdo;


-- 사용자정보
CREATE TABLE IF NOT EXISTS user(
	username	VARCHAR(256),
	password	VARCHAR(256)	NOT NULL,
	profile_image	VARCHAR(256),
	nickname	VARCHAR(20)	NOT NULL	UNIQUE,
	birthdate	VARCHAR(256),
	level	INT,
	credit	INT,
	delete_date	VARCHAR(256),
	PRIMARY KEY(username)	
);

-- 영상
CREATE TABLE IF NOT EXISTS video(
	v_code	BIGINT	AUTO_INCREMENT,
	v_src	VARCHAR(256)	NOT NULL,
	v_title	VARCHAR(256)	NOT NULL,
	v_detail	TEXT,
	v_price	INT,
	v_category	VARCHAR(50),
	v_views	BIGINT,		
	PRIMARY KEY(v_code)
);

-- 이미지
CREATE TABLE IF NOT EXISTS video(
	i_code	BIGINT	AUTO_INCREMENT,
	i_src	VARCHAR(256)	NOT NULL,	
	i_title	VARCHAR(256)	NOT NULL,	
	i_detail	TEXT,
	i_category	VARCHAR(50),		
	i_views	BIGINT,
	PRIMARY KEY(i_code)	
);

-- 게시글
CREATE TABLE IF NOT EXISTS board_content(
	b_code	BIGINT	AUTO_INCREMENT,
	username	VARCHAR(256),
	b_title	VARCHAR(256),	
	b_detail	TEXT,	
	b_category	VARCHAR(125),		
	b_update_date	VARCHAR(125),
	b_modified_date	VARCHAR(125),		
	b_remove_date	VARCHAR(125),		
	b_views	BIGINT		DEFAULT 0,
	b_upvote	BIGINT		DEFAULT 0,
	b_group	VARCHAR(125),
	PRIMARY KEY(b_code)
);

-- 댓글
CREATE TABLE IF NOT EXISTS reply(
	r_code	BIGINT	AUTO_INCREMENT,
	b_code	BIGINT,
	username	VARCHAR(256),
	r_content	VARCHAR(256),		
	r_update_date	VARCHAR(125),		
	r_modified_date	VARCHAR(125),		
	r_remove_date	VARCHAR(125),		
	r_parent_code	BIGINT,
	PRIMARY KEY(r_update_date, r_nickname)
);

-- 추천
CREATE TABLE IF NOT EXISTS upvote(
	b_code	BIGINT,
	username	VARCHAR(256),
	PRIMARY KEY(b_code, username)			
);

-- 첨부파일
CREATE TABLE IF NOT EXISTS attach(
	a_code	BIGINT,
	b_code	BIGINT,
	a_date	VARCHAR(10),
	a_original_name	VARCHAR(256),
	a_save_name	VARCHAR(256),			
	a_ext	VARCHAR(10),		
	PRIMARY KEY(a_code)			
);


