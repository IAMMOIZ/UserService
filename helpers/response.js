var responseHelper = {
sendResponse: function(res, success, data, errors, statusCode){
success = (success)? true : false;
errors = errors || null;
{ data = data || null;
statusCode- statusCode || 1000;

var obj = {
success: success,
errors: errors,
status_code: statusCode
};

if (statusCode != 1002) 
obj.data = data;
res.json (obj);
};

formatResponse :  function(errors) {
var errorResponse = []; 
for (var i in errors) {  
var obj = {

"location": "body",
"parameter": 1,
 "msg": errors[i].message
}
errorResponse.push(obj);

}

return errorResponse;
}
}

module.exports = responseHelper;