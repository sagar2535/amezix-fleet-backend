import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

export const createUser = async (req, res, next) => {
  try {
    const { phone_number, otp, is_verified } = req.body;

    console.log(phone_number, otp, is_verified);
    if (!phone_number || !otp || !is_verified) {
      return next(new AppError("Invalid phone number and otp", 404));
    }
    const user = await User.create({
      phone_number: phone_number,
      otp: otp,
      is_verified: is_verified,
    });
    if (!user) {
      return next(new AppError("No Users Data has been Added!", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Users successfully created",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

export async function updateSingleUserData(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError("User did not found!", 404));
    }
    const { is_verified } = req.body;

    if (!is_verified) {
      return next(new AppError("User does not exist!", 404));
    }

    user.is_verified = is_verified;

    const updatedUser = await user.save();

    res.status(200).json({
      status: "success",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}

// Get a user
export async function getSingleUserData(req, res, next) {
  const { phone_number } = req.body;

  try {
    if (!phone_number) {
      res.status(404).json({
        message: "Phone Number not found",
      });
    }
    const user = await User.findOne({
      where: {
        phone_number,
      },
      raw: true,
      attributes: ["phone_number", "is_verified"],
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}

// Delete a user

export const deleteSingleUserData = async (req, res, next) => {
  try {
    const deletedUser = await User.destroy({ where: { id: req.params.id } });
    if (!deletedUser) {
      return next(new AppError("No Users Data found!", 404));
    }
    res.status(200).json({
      status: "success",
      message: "User successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// This function is used to get a list of users on the server

export const getAllUsersData = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

// This funntion is used to delete all users data form the database

export const deleteAllUserData = async (req, res, next) => {
  try {
    console.log("Deleting all users...");
    const deletedAllUser = await User.deleteMany();
    console.log("Deleted all users:", deletedAllUser);
    if (!deletedAllUser) {
      return next(new AppError("No Users Data has been Deleted!", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Users successfully deleted",
      allBooking: deletedAllUser,
    });
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};
