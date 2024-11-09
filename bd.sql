-- Tabla de categorias
CREATE TABLE category (
    category_name TEXT PRIMARY KEY,
    check (category_name <> '')
);

-- Tabla de productos
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name TEXT NOT NULL,
    product_description TEXT NOT NULL,
    product_price NUMERIC NOT NULL,
    product_category TEXT,
    FOREIGN KEY (product_category) REFERENCES category(category_name),
    CHECK (product_price > 0) ,
    CHECK (product_name <> ''),
    CHECK (product_description <> '')
);

-- Tabla de perfiles
CREATE TABLE role (
    role_name TEXT PRIMARY KEY,
    check (role_name <> '')
);

-- Tabla de usuarios
CREATE TABLE users (
    user_email TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_password TEXT NOT NULL,
    user_address TEXT NOT NULL,
    user_phone TEXT NOT NULL,
    user_role TEXT NOT NULL,
    FOREIGN KEY (user_role) REFERENCES role(role_name),
    CHECK (user_name <> ''),
    CHECK (user_email <> ''),
    CHECK (user_password <> ''),
    CHECK (user_address <> ''),
    CHECK (user_phone <> '')
);

-- Tabla de carrito de compras
CREATE TABLE cart (
    cart_user TEXT,
    cart_product INTEGER,
    cart_quantity INTEGER NOT NULL,
    FOREIGN KEY (cart_user) REFERENCES users(user_email),
    FOREIGN KEY (cart_product) REFERENCES product(product_id),
    PRIMARY KEY (cart_user, cart_product),
    CHECK (cart_quantity > 0)
);

   
-- Crear un usuario administrador
INSERT INTO role (role_name) VALUES ('admin');
INSERT INTO users (user_email, user_name, user_password, user_address, user_phone, user_role) 
VALUES ('admin@admin.es', 'admin', '$2b$10$9MaW96c51RXbeug7S6lr2.xWNXEb.wrXWLfyJL9evvks5wXTpaklO', 'admin', 'admin', 'admin');

-- Eliminar admin
DELETE FROM users WHERE user_email = 'admin@admin.es'