const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName){
        throw new Error("Please enter the name!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!")
    }
}

module.exports = {
    validateSignUpData
}