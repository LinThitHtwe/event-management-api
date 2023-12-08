const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../controllers/ValidationController");
const Admin = require("../models/admin");
const Role = require("../config/role");
const Organizer = require("../models/organizer");
const messages = {
  usernameNotExist: "Username is not found. Invalid login credentials.",
  wrongRole: "Please make sure this is your identity.",
  loginSuccess: "You are successfully logged in.",
  wrongPassword: "Incorrect password.",
  loginError: "Oops! Something went wrong.",
};

const login = async (data, role, res, req) => {
  try {
    const schema = await loginSchema.validateAsync(data);
    const { email, password } = data;
    let foundUser;
    console.log("email: " + email + " password: " + password);
    if (role === Role.organzier) {
      foundUser = await Organizer.findOne({ email: email });
    } else {
      foundUser = await Admin.findOne({ email: email });
      console.log("foundUser", foundUser);
    }

    if (!foundUser) {
      return res.status(404).json({
        reason: "User not found",
        message: messages.usernameNotExist,
        success: false,
      });
    }

    if (foundUser.role !== role) {
      return res.status(403).json({
        reason: "role",
        message: messages.wrongRole,
        success: false,
      });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role,
          },
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const refreshToken = jwt.sign(
        { email: foundUser.email, id: foundUser._id, role: foundUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "5d",
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "None", secure: true });

      const result = {
        user: {
          ...foundUser._doc,
        },
        accessToken: `${accessToken}`,
        refreshToken: refreshToken,
        expiresIn: "30s",
      };
      return res.status(200).json({
        ...result,
        message: messages.loginSuccess,
        success: true,
      });
    } else {
      return res.status(403).json({
        reason: "password",
        message: messages.wrongPassword,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    let errorMsg = messages.loginError;
    if (error.isJoi === true) {
      error.status = 403;
      errorMsg = error.message;
    }
    return res.status(500).json({
      reason: "server",
      message: errorMsg,
      success: false,
    });
  }
};

module.exports = { login };
