-- Create the correct verify_password function that matches the auth code parameters
CREATE OR REPLACE FUNCTION verify_password(input_password TEXT, stored_hash TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Use crypt to verify the password against the stored bcrypt hash
  RETURN stored_hash = crypt(input_password, stored_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION verify_password(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION verify_password(TEXT, TEXT) TO anon;
