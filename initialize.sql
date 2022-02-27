DROP DATABASE IF EXISTS blog;
CREATE DATABASE blog CHARACTER SET utf8 COLLATE utf8_general_ci;
USE blog;
CREATE TABLE articles (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(100),
  summary varchar(200),
  content text,
  category varchar(11),
  PRIMARY KEY (id)
);
INSERT INTO articles(
  id, 
  title, 
  summary, 
  content, 
  category
) VALUES (
  '1',
  'Why Is It Called a Bug?',
  'You may have heard the word "bug" when you''re doing programming right? I''ve researched about the origin of why "bug" is used.',
  'Have you ever said "Oh it''s buggy!" when something weird happened while you''re playing games or using some applications? I got curious about this "bug", so I did some research and here''s what I found! \r\n\r\nFirst of all, the word "buggy" seems to be referring to a glitch that occurred unexpectedly. How did the word "bug" came to refer to a glitch? Well, I''ve researched about this too! \r\n\r\nWhen researching about the origin of the word "bug", it took me back to the time when computers were invented. \r\nThe computers at that time were about the size of a school classroom and looked like factory machines. One day, this big computer suddenly stopped working due to a glitch. The team who invented the computer looked everywhere for the cause of the glitch and found a moth stuck inside the computer. Just because of this one tiny moth, it caused the huge computer to stop working. Since then, the word "bug" has come to mean that glitches were cause by a moth (bug). \r\n\r\nIt''s hard to imagine now that the reason behind the huge computer glitch was because of a real bug was inside the computer! If you have a friend who says, "It''s buggy!", you can tell them this story!',
  'all'
);
INSERT INTO articles(
  id, 
  title, 
  summary, 
  content, 
  category
) VALUES (
  '2',
  'Do You Know the Origins of Cookies?',
  'We might have known cookies as a food, but they''re not related at all. I got curious about it, so I looked it up on the internet and the result was interesting!',
  'When you first heard about Cookies from Master Wooly, did you think of them as something you could eat? Well, I thought of it as a food! But I was disappointed after I heard about the explanation of Cookies as it has nothing to do with food. Because of my disappointment and curiosity on how they got the name Cookies, I looked it up online! \r\n\r\nThere are many things that''ve been said about the origins of the name Cookies, but I''ll just share some of the things that I''ve found.\r\n\r\n1. Cookies are used for storing data, so the name came from the cookies used as storage food.\r\n\r\n2. It was named Cookies because the developer who invented it liked cookies.\r\n\r\n3. It was named after the data that behaves similarly, called "Magic Cookie".\r\n\r\nMe personally, I like the first point which is related to food preservation!  You''ll find something interesting when you look up the origins of the name!',
  'limited'
);
INSERT INTO articles(
  id, 
  title, 
  summary, 
  content, 
  category
) VALUES (
  '3',
  'Mouse That Connects to a Computer',
  'Have you ever heard that every computer has a mouse on it? Actually, this story is true!',
  'Hey I have a mouse connected to my computer! You should get one too! \r\n\r\nI would love to, but I already have a hamster! \r\n\r\nThat''s just a new mouse right? What''s a hamster? \r\n\r\nHaha! Mine doesn''t have a "tail". A mouse without a "tail" is a hamster, right? \r\n\r\nJokes aside, let''s get into our topic.\r\n\r\nRecently, technology has advanced and wireless has become the mainstream. Before wireless technology arrived, we used to connect everything with cords. It''s the same with the computer mouse. It''s said that the name "mouse" comes from the shape and the way the cable is extending from it, which looks like a real mouse. \r\n\r\nNowadays, although we still call it "mouse", it comes with many buttons, no cables, and various shapes, which makes them looking less and less like a mouse!\r\n\r\nOh right! One more thing. Do a search for "mouse movement units" and you might be surprised at what you find!',
  'limited'
);
INSERT INTO articles(
  id, 
  title, 
  summary, 
  content, 
  category
) VALUES (
  '4',
  'What Is the "My" in "MySQL"?',
  'Have you ever thought of the "My" in MySQL refers to the "My" as in "Myself"? Try to look it up and you''ll be surprised to find out that it actually means something completely different!',
  'This time, we''re going to talk about MySQL, which is also used in the Node.js courses.\r\nThe other day, I suddenly found myself wondering about the "My" on MySQL, so I did some research again!\r\nBefore I looked it up, I thought it meant "My" SQL as in I own the SQL because it''s named MySQL, but it actually means something different!\r\n\r\nSo let me share my research with you!\r\n\r\nMySQL was founded by Michael Widenius and his friends. Michael had three children, named My, Max, and Maria, respectively.\r\n\r\nSome of you may have figured out that there''s a child''s name My, and yes, MySQL was named after the founder''s child!\r\n\r\nBy the way, Michael Widenius, the founder of MySQL, has also created other databases named MaxDB and MariaDB. It''s nice to know that you can name your own system after your child!',
  'limited'
);

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(20) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  password varchar(60) DEFAULT NULL,
  PRIMARY KEY (id)
);
INSERT INTO users (username, email, password) VALUES ('Asiwaju','ken@progate.com','asiwaju');
INSERT INTO users (username, email, password) VALUES ('Olanrewaju','master@progate.com','lanre');
INSERT INTO users (username, email, password) VALUES ('Rokeeb','baby@progate.com','rokeeb');
INSERT INTO users (username, email, password) VALUES ('Yusuf','birdie@progate.com','techbird');