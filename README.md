# nodeSimpleService
Simple service for users authorization and viewing notifications
##Usage
starting with  **npm start**

## endpoints

- **POST** localhost:4000/users/authenticate auth user (sets cookie with user login) 
- **GET** localhost:4000/notifications/ get all mesages, needs *read* permission
- **POST** localhost:4000/notifications/send create new notification, needs *create* permission

## users for testing (set login to user cookie)

- dumb (have no permissions)
- junior (have read only permission)
- lead (have create and read permission)
