-- Insert a test user into the Users table
INSERT INTO user (id, name, username, password, createDate)
VALUES (
    '123e4567-e89b-12d3-a456-426614174000', -- Example GUID
    'Test User',                           -- Name
    'testuser',                            -- Username
    'e2cd4b893f202096935335d65457cc5050a3f4f181ee3819864a5e1466d74896981fdbf75244d7f87d199d588d1723f59281f81a597c16a169320668847217b1.cfe6870e7e28cfd0a83792686fad19f6',                 -- Password (hashed with salt) ('Heslo123') 
    '2024-11-101T12:00:00Z'                -- Create Date (ISO 8601 format)
);