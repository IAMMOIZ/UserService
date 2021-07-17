'use strict';
const Schemas = function() {

    this.userSchema = {
"domainId": {
notEmpty: true,
errorMessage: 'domainId is mandatory'
}
}
}
module.exports = Schemas;