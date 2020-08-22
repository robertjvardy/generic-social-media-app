const yup = require("yup");

const registrationSchema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(2).required(),
  email: yup.string().min(6).required().email(),
  password: yup.string().min(6).required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().min(6).required().email(),
  password: yup.string().min(6).required(),
});

module.exports.registrationVal = registrationSchema;
module.exports.loginVal = loginSchema;
