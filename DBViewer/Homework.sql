CREATE DATABASE IF NOT EXISTS FINAL_HOMEWORK;
USE FINAL_HOMEWORK;

-- 存放教师数据的表格
CREATE TABLE Teacher(
	Tno char(5) PRIMARY KEY,				-- 教师工号
    Tname varchar(16) NOT NULL,				-- 姓名
    Tdept varchar(40),   					-- 所在单位
    Tsex char(2) CHECK(Tsex IN('男','女')),	-- 性别
    Ttitle varchar(8),CHECK(Ttitle IN('讲师','教授','副教授'))	-- 职称
);
insert into Teacher value('10001','教师A','工学院','男','教授');
insert into Teacher value('10002','教师B','工学院','男','讲师');
insert into Teacher value('10003','教师C','理学院','男','教授');
insert into Teacher value('10004','教师D','文学院','女','讲师');
insert into Teacher value('10005','教师E','商学院','女','教授');
-- DROP TABLE Teacher;
-- SELECT * FROM Teacher; 





-- 存放书院数据表格
CREATE TABLE Dormitory(
	dorm varchar(10) unique
);
insert into Dormitory value('敬一');
insert into Dormitory value('修远');
insert into Dormitory value('明德');
insert into Dormitory value('知行');
insert into Dormitory value('至诚');
insert into Dormitory value('弘毅');
-- DROP TABLE Dormitory; 
-- SELECT * FROM dormitory;






-- 存放学生数据的表格
CREATE TABLE Student(
	Sno char(10) PRIMARY KEY,       		   -- 学号
    Sname varchar(16) NOT NULL,   		       -- 姓名
    Ssex char(2) CHECK(Ssex IN('男','女')),	   -- 性别
    Sbirthday char(10),  	 -- 出生日期
    Shometown  varchar(40),  -- 籍贯
    Smajor	   varchar(20),  -- 专业
    Stutor char(5),          -- 导师    (外键,教师号)
    Sdorm	   varchar(10),  -- 所在书院(外键，书院名)
    FOREIGN KEY (Stutor) REFERENCES Teacher(Tno),
    FOREIGN KEY (Sdorm)  REFERENCES Dormitory(dorm)
);
insert into Student value('2018611001','王大锤','男','2000-08-30','广东','计算机','10001','敬一');
insert into Student value('2018611002','王二锤','男','2000-09-30','广东','计算机','10001','敬一');
insert into Student value('2018611003','王三锤','男','2000-10-30','广东','计算机','10001','修远');
insert into Student value('2018611004','龙舌蓝','女','2000-02-10','山东','计算机','10002','明德');
insert into Student value('2018611005','龙舌绿','女','2000-03-25','福建','计算机','10002','知行');

-- DROP TABLE Student;
-- SELECT * FROM  Student;
-- 个人感觉可以直接去掉入学年份,毕竟能在学号看出来


-- 存放所有课程数据的表格
CREATE TABLE allCourse(
	Cno char(6) PRIMARY KEY,
	Cname varchar(40) NOT NULL,	-- 课程名称
    Cpoint  real   NOT NULL,	-- 学分
    Ctime	int    NOT NULL CHECK(Ctime%8=0), 	-- 学时(8整数倍)
	Cstart  varchar(40),  -- 上课开始的时间
    Croom	varchar(40),  -- 上课所有的教室

    Cterm char(2) CHECK(Cterm IN('春','夏','秋','冬')), -- 科任老师(外键)
    Ctype char(8) CHECK(Ctype IN('专业选修','专业必修','通识选修','通识必修','基础必修')),  -- 课程类型
    Tno char(5),
    
    FOREIGN KEY(Tno) REFERENCES Teacher(Tno)
);
insert into allCourse value('131234','线性代数',4,16,'周一12','E201','春','基础必修','10003');
insert into allCourse value('131235','高等代数',4,16,'周一34','E202','春','基础必修','10003');
insert into allCourse value('131236','密码学',2,16,'周三12','讲堂三','春','专业选修','10001');
insert into allCourse value('131237','Web开发',2,16,'周四67','讲堂四','春','专业选修','10001');
insert into allCourse value('131238','Python数据挖掘',2,16,'周二89','讲堂二','春','专业选修','10002');
insert into allCourse value('131239','计算机组成原理',4,16,'周二67','讲堂二','春','专业必修','10002');
insert into allCourse value('131240','西方文化的演进',2,16,'周五34','讲堂五','春','通识选修','10004');
insert into allCourse value('131241','马克思基本原理',4,24,'周一ABC','讲堂三','春','通识必修','10005');
-- DROP TABLE allCourse;  
-- SELECT * FROM allCourse;



-- 存放选课数据的表格
CREATE TABLE Course(
	Cno char(6)  ,			-- 开班课号
	Sno char(10) ,			-- 学号
    PRIMARY KEY(Sno,Cno), 					  -- 实体完整性约束
    FOREIGN KEY(Sno) REFERENCES Student(Sno), -- 参照完整性约束
    FOREIGN KEY(Cno) REFERENCES allCourse(Cno)  -- 参照完整性约束
);
-- 课程类型可以通过Cno获取


CREATE TABLE SC(
	Cno char(6)  ,			-- 开班课号
	Sno char(10) ,			-- 学号
	score int, 			    -- 成绩
	FOREIGN KEY(Sno) REFERENCES Student(Sno), 
    FOREIGN KEY(Cno) REFERENCES allCourse(Cno)
);
-- 感觉这张表跟上面那张有点重复，似乎可以优化一下
