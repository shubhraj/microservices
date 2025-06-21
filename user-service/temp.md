API:

POST /api/auth/register

{
"username": "shubham",
"email": "shubham@example.com",
"password": "mysecret"
}

POST /api/auth/login

{
"email": "shubham@example.com",
"password": "mysecret"
}

"message": "Login successful",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODUxNTVhNTY4MDhmMTEyZTQ5ZDJjYzEiLCJlbWFpbCI6InNodWJoYW1AZXhhbXBsZS5jb20iLCJpYXQiOjE3NTA1MDYzOTYsImV4cCI6MTc1MDUwOTk5Nn0.6D6sgOrzW-0OW2LbsAnvYrHN3j7vd4qFX0dG8bk4OMk"

GET /api/users/profile

Authorization: Bearer <paste_token_here>