CREATE TABLE users (
	    id SERIAL PRIMARY KEY,
	    name VARCHAR(100),
	    email VARCHAR(100)
);

INSERT INTO users(name,email)
VALUES
('John Doe','john@test.com'),
('Alice Smith','alice@test.com');
