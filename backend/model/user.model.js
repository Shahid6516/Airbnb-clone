import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    listing: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
