CREATE TABLE Users(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_gmail VARCHAR(20) NOT NULL UNIQUE,
    user_password VARCHAR(20) NOT NULL,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    bio TEXT,
    phone_number BIGINT ,
    country VARCHAR(30),
    city VARCHAR(30)
);