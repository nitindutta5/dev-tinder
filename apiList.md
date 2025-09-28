## authRouter
 - POST  /signup
 - POST /signin
 - POST /logout

## profileRouter  
 - GET /profile/view 
 - PATCH /profile/edit
 - PATCH /profile/password

## connectionRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed Get the profile of other users on platform

Status : ignored, interested, accepted, rejected