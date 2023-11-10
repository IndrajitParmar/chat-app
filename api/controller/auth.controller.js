import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { userName, email } = req.body;
  try {
    const exist = await User.findOne({ $or: [{ userName }, { email }] });
    if (exist) {
      if (exist.userName === userName && exist.email === email) {
        // Both username and email already exist
        res.status(400).json("Username and email already exist");
      } else if (exist.userName === userName) {
        // Username already exists
        res.status(400).json("Username already exists");
      } else {
        // Email already exists
        res.status(400).json("Email already exists");
      }
    } else {
      const user = await new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });
      try {
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(404).json("user not found");
    } else {
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (validPassword) {
        const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);

        console.log(validUser._doc);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
      } else {
        res.status(401).json("Invalid password");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async (req, res) => {
  console.log(req.body);
  try {
    res.clearCookie("token").status(200).json("sign out");
  } catch (error) {
    console.log(error);
  }
};
