const bcrypt = require("bcryptjs");
const {
  adminSchema,
  organizerSchema,
  validateEmail,
} = require("../controllers/ValidationController");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const Admin = require("../models/admin");
const Organizer = require("../models/organizer");
const Role = require("../config/role");
const { add_admin } = require("../services/adminService");
const { create_organizer } = require("../services/organizerService");
const { add_payment } = require("../services/paymentService");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: true,
      auth: {
        user: process.env.SEND_USER,
        pass: process.env.SEND_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.COMPANY_NAME,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
const message = {
  usernameExists: "Username is already taken.",
  emailExists: "Email is already registered.",
  signupSuccess: "You are successfully signed up.",
  signupError: "Unable to create your account.",
};

const register = async (data, role, res) => {
  try {
    let schema;
    if (role === Role.organzier) {
      schema = organizerSchema;
    } else {
      schema = adminSchema;
    }

    await schema.validateAsync(data);

    const emailNotRegistered = await validateEmail(data.email, role);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: message.emailExists,
        success: false,
      });
    }

    const password = await bcrypt.hash(data.password, 12);

    const userToAdd = {
      ...data,
      password,
      role,
    };

    if (role === Role.superAdmin || role === Role.staff) {
      await add_admin(userToAdd);
    } else {
      await create_organizer(userToAdd);
    }
    const token = jwt.sign(
      {
        user_id: data.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );
    let user;
    if (role === Role.organzier) {
      user = await Organizer.findOne({ email: data.email });
    } else {
      user = await Admin.findOne({ email: data.email });
    }

    if (!user) {
      return res.status(400).json({
        message: message.signupError,
        success: false,
        error: "User not found",
      });
    }

    const userId = user._id;

    const send_message = `http://localhost:${process.env.CLIENT_PORT}/verification/${userId}/${token}`;
    if (role == Role.organzier) {
      const paymentData = data.payment;
      const response = [];
      for (const payment of paymentData) {
        try {
          const addedPayment = await add_payment({
            ...payment,
            organizer: userId,
          });

          response.push(addedPayment);
        } catch (error) {
          return res.json(error);
        }
      }
    }
    await sendEmail(data.email, "Verify Email", send_message);

    return res.status(201).json({
      message: message.signupSuccess,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: message.signupError,
      success: false,
      error: error.message,
    });
  }
};

const verification = async (req, res) => {
  console.log("Verify");
  try {
    let user;
    user =
      (await Organizer.findOne({ _id: req.params.userId })) ||
      (await Admin.findOne({ _id: req.params.userId }));
    if (!user) return res.status(400).send("Invalid link");
    await Organizer.updateOne(
      { _id: req.params.userId },
      { $set: { isVerify: true, accountStatus: "active" } }
    );
    await Admin.updateOne(
      { _id: req.params.userId },
      { $set: { isVerify: true, accountStatus: "active" } }
    );
    res.send({ message: "Email Verified Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, verification, sendEmail };
