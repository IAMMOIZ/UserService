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

req.app.responseHelper.send Response (res, false, {}, errors, 1002);

return;

} else {

req.isAuthorized = true;

req.user user;

next();

});

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
    
     @swagger
    
     definition:
    
    ADObject:
    
    properties:
    [2:49 pm, 17/07/2021] A: * @swagger

* securityDefinitions:

Authorization:

66 type: apiKey

67

name: accesstoken

68 description: Enter JWT token received in /user/signin response.

69 in: header

70

71

72 /**

73* @swagger

74 definition:

75 M

userRegister:

76 properties:

77 userId:

78 -

79 -

type: integer

name:

type: string

domainId:

name:

type: string

emptype:

type: string

description: Emptype will be by default "ril"
[2:51 pm, 17/07/2021] A: type: string

emailId:

type: string

Blame

Fork Clone

Contents

82 83 .

84 .

85 /

86

87 /**

88 @swagger

89 /sv_api_user/user/signin:

90 - post:

91 tags:

92 93 User description: Signin

94 produces:

95⁰ -

application/json

96 parameters:

97

98 99

100

101

102

name: userSign In

description: userSignIn object

in: body:

required: true

schema:

Sref: '#/definitions/userSignIn"

103 responses:

104 -

185 -

406 /

289:

description: Login Successful.

187 router.post("/user/signin", userController.validateBody, userController.checkliser, userController.ssologin, userController. FetchUserfole, userController.signolo);

106
[2:52 pm, 17/07/2021] A: explorer

110 @swagger 111

/sv_api_user/user/register:

112 post:

113 tags:

114 - User 120 W 133 * /sv_api_user/user/bulkRegister:

115

description: Register a new user

116 produces:

117

118

119

121

122 .

application/json

parameters:

- name: userRegister

description: userRegister object

in: body

required: true

123 schema:

124 .

Sref: "#/definitions/userRegister'

125 responses:

126 127

128 */

200:

description: Registration Successful.

129 router.post("/user/register", userController.registerUser);

130

131 /**

132 @swagger

134 post:

135 M tags:

136 User
[2:52 pm, 17/07/2021] A: description: Register a new user

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

description: Registration Successful.

router.post("/user/bulkRegister", authenticateUser, userController.bulkRegister);

* @swagger

*/sv_api_user/user/searchFromAD:

post:

tags:

- User

description: Search users from AD
[2:54 pm, 17/07/2021] A: de explorer

164

165

166 -

167

produces:

- application/json

security:

Authorization: []

168 parameters:

169 170 description: ADObject

- name: ADObject

171 in: body

172 * required: true

173 schema:

174

$ref: #/definitions/ADObject'

175 responses:

176 200:

177 *

178 */

description: Success

179 router.post("/user/searchFromAD", authenticateUser, userController.searchADUsers);

180

181 /**

182 @swagger

183 /sv_api_user/user/verifyToken:

184 get:

185 tags:

186 - User

187 description: Verify the token

188 produces:

189 190 - application/json

parameters:
[2:54 pm, 17/07/2021] A: explorer

191 -

192

193

194

195 *

196

name: token

type: string

description: token

in: query

required: true

responses:

197 200:

198

199 */

description: Success

200 router.get("/user/verifyToken", userController.verifyUser Token);

201

202 /**

203 * @swagger

204 * /sv_api_user/user/search:

205 * get:

206 tags:

207 - User

208 description: Search user by name

209 produces:

210 . - application/json

211 security:

212

213

- Authorization: []

parameters:

214 M

215 .

216

217 ->

- name: name

type: string

description: user name

in: query
[2:56 pm, 17/07/2021] A: 246

247

248 *

249

250 -

251

252

253

254

255

256

257

258

259

260

261

262

263

264

265 */

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

router.get("/user/getByPlant", authenticateUser, userController.searchUserBySitePlant);
/*@swagger

/sv_api_user/user/{id}:
get:

tags:

X
 3 - User

4 description: Get user by id

5

6

produces:

- application/json

7 security:

8

Authorization: []

9 parameters:

in: path

name: id

32 33 required: true

type: string

description: User id

85 - responses:

86 200:

87

88 */

description: Success

89 router.get("/user/:id", authenticateUser, userController.getUserById); 90

291 /**

292 @swagger

293 /sv_api_user/user:

294 get:

295 tags:

User

297 description: Get list of users

298 produces:

application/json
[3:00 pm, 17/07/2021] A: security:

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

description: Success

router.get("/user", authenticateUser, userController.getUsers);

module.exports router;
