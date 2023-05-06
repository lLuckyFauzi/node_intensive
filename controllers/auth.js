const sequelize = require("../models/index").sequelize;
const { DataTypes } = require("sequelize");
const UserModel = require("../models/user");

const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.test = async (req, res, next) => {
  console.log("Hello");
};

exports.register = async (req, res, next) => {
  try {
    const password = req.body.password;

    const hashPassword = await bycrpt.hash(password, 10);
    const data = await UserModel(sequelize, DataTypes).create({
      nama: req.body.nama,
      email: req.body.email,
      password: hashPassword,
    });
    res.status(200).json({
      message: "User Created!",
      data: data,
    });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const findEmail = await UserModel(sequelize, DataTypes).findOne({
      where: { email: email },
    });
    if (!findEmail) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const compare = await bycrpt.compare(password, findEmail.password);
    if (!compare) {
      return res.status(404).json({ message: "Password salah!" });
    }

    const payload = {
      id: findEmail.id,
      nama: findEmail.nama,
    };

    const token = jwt.sign(payload, "secret");

    res.status(200).json({
      message: "Login berhasil",
      token: token,
    });
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};
