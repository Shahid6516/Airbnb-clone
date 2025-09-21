import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
  console.log("====== Incoming Add Listing ======");
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  console.log("USER:", req.userId);

  try {
    const host = req.userId;
    const { title, description, rent, city, landmark, category } = req.body;
    const image1 = await uploadOnCloudinary(req.files.image1[0].path);
    const image2 = await uploadOnCloudinary(req.files.image2[0].path);
    const image3 = await uploadOnCloudinary(req.files.image3[0].path);

    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });
    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json(listing);
  } catch (error) {
    return res.status(500).json({ message: `Addlisting Error:${error}` });
  }
};

export const getListing = async (req, res) => {
  try {
    const listing = await Listing.find().sort({ createdAt: -1 });
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ message: `getListing Error:${error}` });
  }
};

export const findListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(400).json({ message: "Listing not found ❌" });
    }
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ message: `findListing Error: ${error}` });
  }
};

export const updateListing = async (req, res) => {
  try {
    let image1;
    let image2;
    let image3;
    const { id } = req.params;
    const { title, description, rent, city, landmark, category } = req.body;
    if (req.files.image1) {
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }
    if (req.files.image2) {
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
    }
    if (req.files.image3) {
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rent,
        city,
        landmark,
        category,
        image1,
        image2,
        image3,
      },
      { new: true }
    );
    return res.status(201).json(listing);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Update Listing Error: ${error.message || error}` });
  }
};
