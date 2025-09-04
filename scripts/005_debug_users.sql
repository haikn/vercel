-- Debug script to check users table and verify test account
SELECT 
    id,
    username,
    email,
    password_hash,
    created_at
FROM users;

-- Also check if the verify_password function exists
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_name = 'verify_password';
