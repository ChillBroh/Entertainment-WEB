use entertainmentDb;

drop table admins;
drop table organizers;
drop table attendees;
drop table messages;
drop table chats;
drop table users ;
drop table token;
drop table otp;


select * from otp;
select * from attendees;
select * from users;
select * from token;
select * from organizers;
select * from chats;
select * from messages;
SELECT o.organizerId 
FROM organizers o
LEFT JOIN users u ON u.id=o.user_id where u.email like "%ishara%";




CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
	img Varchar(1000),
    password VARCHAR(255) NOT NULL,
    role ENUM('Attendee','Organizer','Admin') NOT NULL,
    confirmed BOOLEAN DEFAULT FALSE
);

CREATE TABLE attendees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    nic varchar(255) ,
     role ENUM('Attendee') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE organizers (

    user_id INT unique,
    organizerId Int primary key,
    address Varchar(1000) not null,
    person1 Varchar(255) Not null,
    phone1 Varchar(255) not null,
        person2 Varchar(255) Not null,
    phone2 Varchar(255) not null,
     role ENUM('Organizer') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
     role ENUM('Admin') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chatImg varchar(1000) not null,
    chatName varchar(255) not null,
    creator varchar(255) NOT NULL,
    createdDate date NOT NULL,
    FOREIGN KEY (creator) REFERENCES users(email)
);

create Table messages (
	id INT AUTO_INCREMENT PRIMARY KEY,
	message VARCHAR(1000) NOT NULL,
    chatId int not null,
    FOREIGN KEY (chatId) REFERENCES chats(id)
);

CREATE TABLE Token (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiresAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 3600 SECOND)
);
CREATE TABLE otp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    otp VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiresAt TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 3600 SECOND)
);


