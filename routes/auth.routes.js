/**
 * ! This file will act as the route for authentication and authorization
 * 
 */
//? Define the routes - REST endpoints for user registration.
const authController = require("../controllers/auth.controller");
const { verifySignup } = require("../middlewares");
const { verifyLogin } = require("../middlewares");

module.exports = (app) => {

  //? POST 127.0.0.1:4000/crm/api/v1/auth/signup
  // app.post("/app/api/v1/signup", [verifySignup.validateSignupRequest], authController.signup);
  app.post("/app/api/v1/signup", authController.signup);

  //? POST 127.0.0.1:4000/crm/api/v1/auth/signin
  app.post("/app/api/v1/login", [verifyLogin.validateLoginRequest], authController.login);
}