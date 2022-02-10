CREATE TABLE USERS(
	user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	user_first_name VARCHAR(64) NOT NULL, 
	user_last_name VARCHAR(64) NOT NULL, 
	user_identification_document = VARCHAR(24) NOT NULL, 
	user_email VARCHAR(255) NOT NULL, 
	user_password VARCHAR(255) NOT NULL
); 