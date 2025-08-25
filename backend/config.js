require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "deekshantTyagi";

module.exports = {
  JWT_SECRET,
};
