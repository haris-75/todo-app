-- CREATE DATABASE todo_app;

CREATE TABLE IF NOT EXISTS todo_list(
    list_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    archived Boolean DEFAULT false,
    last_updated timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(list_id)
);

CREATE TABLE IF NOT EXISTS todo_item(
    item_id INT GENERATED ALWAYS AS IDENTITY,
    list_id INT,
    description VARCHAR(255) NOT NULL,
    completed Boolean DEFAULT false,
    last_updated timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(item_id),
     CONSTRAINT fk_list
      FOREIGN KEY(list_id) 
	  REFERENCES todo_list(list_id)
);