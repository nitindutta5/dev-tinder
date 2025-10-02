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

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "about",
    "gender",
    "skills",
    "age"
  ];
  let isEditAllowed = Object.keys(req.body).every((key) => allowedEditFields.includes(key));
  return isEditAllowed
}; 

const isPasswordStrongEnough = (password) => {
  return validator.isStrongPassword(password);
}

module.exports = {
    validateSignUpData,
    validateProfileEditData,
    isPasswordStrongEnough
}