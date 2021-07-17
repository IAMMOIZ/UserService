 var express = require("express");
const router = express.Router({ mergeParams: true });
var userController = require('../controllers/user/controller'); 
var config = require('../config/config');
var jwt = require('jsonwebtoken');
const Request =require('request');

//Middleware function to validate the access token and authorize the request 
function authenticateUser (req, res, next) {
var token = req.header('accesstoken');
if (token) {
jwt.verify (token, config. JWT_SECRETE_KEY, (err, user) => {
if (err) {
let errors = [ {
"msg": "Unauthorized user access"
}];
req.app.responseHelper.send( Response (res, false, {}, errors, 1002));
return;
} else {
req.isAuthorized = true;
req.user = user;
next();
}});

} else {
    let error =[{
    "msg": "Please provide authorization user token"
    }];
    req.app.responseHelper.sendResponse (res, false, {}, errors, 1002);
    return;
    }
    }
    // // Routes for user microservice
    // * @swagger
    // * definition:
    // userSignIn:
    // properties:
    // username:
    // type: string
    // password:
    // type: string
    // description: Password must be base64 encoded
    // /**
    // * @swagger
    // * definition:
    //ADObject:
    //properties:
    // * @swagger
    //* securityDefinitions:
    //Authorization:
    //type: apiKey
    //name: accesstoken
    //description: Enter JWT token received in /user/signin response.
    //in: header
    /**
    //* @swagger
    //definition:
    //M
//userRegister:
// properties:
// userId:
//type: integer
//name:
//type: string
//domainId:
//name:
//type: string
//emptype:
//type: string
//description: Emptype will be by default "ril"
// type: string
//emailId:
//type: string
// @swagger
//sv_api_user/user/signin:
//- post:
//tags:
//User description: Signin
//produces:application/json
//parameters:
//name: userSign In
//description: userSignIn object
//in: body:
//required: true
//schema:
//ref: '#/definitions/userSignIn"
//responses:
//description: Login Successful.
*/
router.post("/user/signin", userController.validateBody, userController.checkliser, userController.ssologin, userController. FetchUserfole, userController.signolo);


/* @swagger 
//sv_api_user/user/register:
//post:
//tags:
//- User  * /sv_api_user/user/bulkRegister:
//description: Register a new user
produces:
application/json
parameters:
- name: userRegister
description: userRegister object
in: body
required: true
schema:
Sref: "#/definitions/userRegister'
responses:
*/
//description: Registration Successful.
router.post("/user/register", userController.registerUser);
/**
@swagger
post:
M tags:
User
 A: description: Register a new user
produces:
- application/json
parameters:
- name: from
type: string
description: Fetch records from
in: query
required: true
name: to
type: string
description: Fetch records till
in: query
required: true
responses:
200:
description: Registration Successful.*/
router.post("/user/bulkRegister", authenticateUser, userController.bulkRegister);
/* @swagger
/sv_api_user/user/searchFromAD
post:
tags:
- User
description: Search users from AD
 de explore
produces:
- application/json
security:
Authorization: []
parameters:
description: ADObject
- name: ADObject
in: body
* required: true
schema:
$ref: #/definitions/ADObject'
responses*/
//description: Success
router.post("/user/searchFromAD", authenticateUser, userController.searchADUsers);
/**
@swagger
/sv_api_user/user/verifyToken:
get:
tags:
- User
description: Verify the token
produces:
- application/json
parameters:
explore
name: token
type: string
description: token
in: query
required: true
responses:
200:
*/
// description: Success
router.get("/user/verifyToken", userController.verifyUser ,Token);
/**
* @swagger
* /sv_api_user/user/search:
* get:
tags:
- User
description: Search user by name
produces:
 - application/json
security:
- Authorization: []
parameters:
- name: name
type: string
description: user name
in: query
required: true
- name: role_id
type: string
description: role id
in: query
required: false
- name: subelement
type: string
description: subelement id
in: query
required: false
name: name
type: string
description: name
in: query
required: false
responses:
200:
description: Success
*/
router.get("/user/getByPlant", authenticateUser, userController.searchUserBySitePlant);
/*@swagger
/sv_api_user/user/{id}:
get:
tags:
X- User
description: Get user by id
produces:
- application/json
security:
Authorization: []
parameters:
in: path
name: id
required: true
type: string
description: User id
- responses:
200:
*/
// description: Success

router.get("/user/:id", authenticateUser, userController.getUserById);
/**
@swagger
/sv_api_user/user:
get:
tags:
User
description: Get list of users
produces:
application/json
A: security:
Authorization: []
parameters:
name: skip
type: number
description: skip
in: query
name: limit
type: number
description: limit
in: query
responses:
200:
description: Success*/
router.get("/user", authenticateUser, userController.getUsers);
module.exports =  router;
