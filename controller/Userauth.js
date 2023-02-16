const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const registeruser = async(req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(email && password && lastName && firstName)) {
      res.status(400).send("All fields required");
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // console.log(req.body.email);
    // const oldUser = await User.findOne({ email:email })
    console.log(oldUser)
    // if (oldUser) {
    //   return res.status(409).send("User is already registered");
    // }

    encrypted_password = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encrypted_password,
    });

    const token = jwt.sign({ user_id: newuser.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "5h",
    });
    newuser.token = token;
    console.log(newuser);
    res.status(200).json(newuser);
  } catch (err) {
    res.json(err);
  }
};

const loginuser = async(req, res) => {

try{

    const {email,password} = req.body
    if(!(email&&password)){
        res.send("All input is required")
    }

    const newuser  = await User.findOne({"email":email});
    console.log(newuser);

    if (newuser && (await bcrypt.compare(password,newuser.password))){
        const token = jwt.sign(
            {users_id:newuser.id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn:"5h"
            }
        );
        newuser.token = token;

        return res.status(200).json(newuser);
    }
    return res.status(400).send("Invalid Credentials");
} catch (err) {
    console.log(err);
  }

};

const welcome = (req, res) => {
    res.send("Sucessfully logged in")

}

module.exports = {
  loginuser,
  registeruser,
  welcome
};
