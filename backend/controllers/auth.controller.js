import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email }).populate(
      "listing",
      "title image1 image2 image3 description rent category city landmark"
    );

    if (existUser) {
      return res.status(400).json({
        message: "User is already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = await genToken(user._id); //genrate token

    // save cookie and keep secure
    res.cookie("token", token, {
      httpOnly: true,
      secure:true ,
        // process.env.NODE_ENVIROMENT === "production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Signup error:${error}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User is not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const token = await genToken(user._id); //genrate token

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      user,
      message: "User Login successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Login error:${error}`,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "User logout successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Logout error:${error}`,
    });
  }
};
