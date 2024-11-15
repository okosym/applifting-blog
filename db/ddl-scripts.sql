/*
Created: 10/11/2024
Modified: 14/11/2024
Model: RE SQLite 3.7
Database: SQLite 3.7
*/

-- Create tables section -------------------------------------------------

-- Table user

CREATE TABLE user
(
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  createDate TEXT NOT NULL,
  CONSTRAINT PK_user_id PRIMARY KEY (id),
  CONSTRAINT UNIQUE_user_username UNIQUE (username)
)
;

-- Table article

CREATE TABLE article
(
  id TEXT NOT NULL,
  userId TEXT NOT NULL,
  title TEXT NOT NULL,
  perex TEXT NOT NULL,
  content TEXT NOT NULL,
  imageId TEXT,
  createDate TEXT NOT NULL,
  changeDate TEXT NOT NULL,
  CONSTRAINT PK_article_id PRIMARY KEY (id),
  CONSTRAINT user_articles
    FOREIGN KEY (userId)
    REFERENCES user (id)
)
;

CREATE INDEX IX_user_articles
  ON article (userId)
;

-- Table comment

CREATE TABLE comment
(
  id TEXT NOT NULL,
  articleId TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  score INTEGER NOT NULL,
  createDate TEXT NOT NULL,
  CONSTRAINT PK_comment_id PRIMARY KEY (id),
  CONSTRAINT article_comments
    FOREIGN KEY (articleId)
    REFERENCES article (id)
)
;

CREATE INDEX IX_article_comments
  ON comment (articleId)
;

-- Table commentVote

CREATE TABLE commentVote
(
  id TEXT NOT NULL,
  commentId TEXT NOT NULL,
  type INTEGER NOT NULL,
  ipAddress TEXT NOT NULL,
  createDate TEXT NOT NULL,
  CONSTRAINT PK_commentVote PRIMARY KEY (id),
  CONSTRAINT comment_commentVotes
    FOREIGN KEY (commentId)
    REFERENCES comment (id)
)
;

CREATE INDEX IX_comment_commentVotes
  ON commentVote (commentId)
;

