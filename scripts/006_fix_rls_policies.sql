-- Fix RLS policies for users table to allow authentication
-- This script adds a policy to allow reading user data for authentication

-- First, let's check if RLS is enabled and what policies exist
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users';

-- Show existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users';

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Users can only see their own data" ON users;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON users;

-- Create a policy that allows reading users for authentication
-- This allows the login function to query users by username
CREATE POLICY "Allow authentication queries" ON users
    FOR SELECT
    USING (true);

-- Alternative: If you want to be more restrictive, you can create a policy
-- that only allows reading specific columns needed for authentication
-- CREATE POLICY "Allow authentication queries" ON users
--     FOR SELECT
--     USING (true);

-- Verify the new policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users';

-- Test query to verify access
SELECT username, email FROM users LIMIT 5;
