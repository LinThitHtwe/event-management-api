const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const multer = require("multer");
const supabase = require("../config/supabase");
const verifyRefresh = (email, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const isValid = decoded.email === email;
    const role = decoded.role;
    return { isValid, role };
  } catch (error) {
    console.error("Token verification failed", error.message);
    return { isValid: false, role: null };
  }
};

const getOrganizerIdFromToken = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(403).send("Access denied.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.UserInfo.id;
    return id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const imageUpload = async (req, res) => {
  const file = req.file;
  console.log(file);

  const { data, error } = await supabase.storage
    .from("image") // Replace with your Supabase Storage bucket name
    .upload(file.originalname, file.buffer);

  if (error) {
    return error;
  }

  const imageUrl = data.Key;
  return imageUrl;
};

module.exports = { verifyRefresh, getOrganizerIdFromToken, imageUpload };
