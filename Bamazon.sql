CREATE database bamazon;
USE bamazon;
CREATE TABLE products(
id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price INTEGER(100) NULL,
stock_quantity INTEGER(100) NULL
);

USE bamazon;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item1", "toys", 10, 100),
		("item2", "apparel", 45, 20),
        ("item3", "music", 5, 500),
        ("item4", "toys", 13, 44),
        ("item1", "grocery", 10, 100),
        ("item1", "household", 12, 1000),
        ("item1", "accessories", 56, 98),
        ("item1", "school", 35, 76),
        ("item1", "toys", 5.99, 100),
        ("item1", "kitchen", 10, 100)
        
        
        