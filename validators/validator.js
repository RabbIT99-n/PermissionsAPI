//Help file with needed validators for API calls 

const { body, validationResult } = require('express-validator')

//Validation rules function for call of adding user to group
const addUserValidationRules = () => {
  return [
    //Groupname min character length is 3 and no special characters in name
    body('reqgroup').isAlphanumeric().isLength({min:3}),
    //Username min character length is 3 and no special characters in name
    body('requser').isAlphanumeric().isLength({min:3})

  ]
}
//Validation rules function for call of adding permission to a user or group
const addPermissionValidationRules = () => {
    return [
        //Group or user name min character length is 3 and no special characters in name
        body('reqowner').isAlphanumeric().isLength({min:3}),
        //Object name min character length is 3
        body('reqobjname').isLength({min:3}),
        //Permission type min character length is 3 and no special characters
        body('reqtype').isAlphanumeric().isLength({min:3}),
        //Owner type can be user or group
        body('reqownertype').custom((value, {req, loc, pah}) => {
            if (value.toLowerCase()==='group' || value.toLowerCase()==='user') {
                return value;
            }
            else {
                return false;
            }
        })

    ]
  }
//Function to perform validation 
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next();
  }
    return res.status(422).json('Error! Incorrect input data!');
}

module.exports = {
    addUserValidationRules,
    addPermissionValidationRules,
    validate,
}