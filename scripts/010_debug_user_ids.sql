-- Debug script to check user IDs in the database
SELECT 
    id,
    username,
    email,
    created_at
FROM users
ORDER BY created_at;

-- Also check if there are any tasks and their user_id references
SELECT 
    t.id as task_id,
    t.task_name,
    t.user_id,
    u.username
FROM tasks t
LEFT JOIN users u ON t.user_id = u.id
LIMIT 10;
