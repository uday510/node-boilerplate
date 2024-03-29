const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");


exports.signup = async (req, res) => {

console.log("BODY ", req.body)

  const userObj = {
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  }

  try {
    const userCreated = await User.create(userObj);

    const userCreationResponse = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt
    }

    res.status(201).send(userCreationResponse);
  } catch (err) {
    console.error("Error while creating user", err.message);
    res.status(500).send({
      message: "Internal server error while creating user"
    });
  }
}

exports.login = async (req, res) => {

  const user = await User.findOne({ userId: req.body.userId });

  if (user == null) {
    return res.status(400).send({
      message: "Failed ! User id doesn't exist"
    });
  }

  //! User is existing, so now will do the password matching
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  console.log(isPasswordValid);

  if (!isPasswordValid) {
    return res.status(401).send({
      message: "Invalid Password"
    });
  }

  const token = jwt.sign({ id: user.userId }, config.secret, {
    expiresIn: 600
  });

  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    accessToken: token
  });

}
