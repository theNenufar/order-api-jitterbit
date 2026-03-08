CREATE TABLE orders (
    orderId VARCHAR PRIMARY KEY,
    value NUMERIC,
    creationDate TIMESTAMP
);

CREATE TABLE items (
    orderId VARCHAR REFERENCES orders(orderId),
    productId INTEGER,
    quantity INTEGER,
    price NUMERIC,
    PRIMARY KEY (orderId, productId)
);
