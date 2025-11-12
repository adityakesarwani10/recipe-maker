# TODO: Implement Automatic Token Refresh in /api/user/me

## Tasks
- [x] Modify app/api/user/me/route.ts to handle access token expiration by checking refresh token
- [x] Add logic to verify refresh token against database
- [x] Generate new access token if refresh token is valid and set in cookies
- [x] Return appropriate message if refresh token is invalid or missing (prompt login)
- [ ] Test the endpoint to ensure no repeated errors and proper token refresh

## Notes
- Use existing helpers/auth.ts for token generation
- Ensure database connection and user model are properly used
- Handle JWT verification errors gracefully
