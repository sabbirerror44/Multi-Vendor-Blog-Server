//external imports
const bcrypt = require("bcrypt");
const createError = require("http-errors");

// internal imports
const User = require("../Models/User");

//get Auth
async function getAuth(req, res, next) {
    res.send('authRouter Page');
}

//post signup
async function postSignUp(req, res, next) {
   let newUser;
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   newUser = new User({
       ...req.body,
       password: hashedPassword,
   })
 
  //save user or send error
  try {
    const result = await newUser.save();
  res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

//do login
async function login(req, res, next) {
    try {
      //find a user who has this email/username
      const user = await User.findOne({email: req.body.email});
      if (user && user._id) {
        const isValidPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isValidPassword) {
          //prepare the user object to generate token
          const userObject = {
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
          };

          res.status(200).json({
            user: userObject,
            message: "User Logged In successfully!",
          });
        } else {
          throw createError("Login failed! Please try again.");
        }
      } else {
        throw createError("Login failed! Please try again.");
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }


module.exports = {
    getAuth,
    postSignUp,
    login,
}