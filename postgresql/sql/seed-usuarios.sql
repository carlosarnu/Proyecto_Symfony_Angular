
INSERT INTO usuarios (nombre, email, password, roles)
VALUES 
('Carlos Arnanz', 'carlos@hotmail.com', 'password123', '["ROLE_ADMIN"]'::jsonb),
('Paco Flores', 'paco@hotmail.com', 'password123', '["ROLE_USER"]'::jsonb),
('Maria Lopez', 'marilo@hotmail.com', 'password123', '["ROLE_USER"]'::jsonb);
