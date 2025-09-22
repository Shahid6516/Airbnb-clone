import Listing from "../model/listing.model.js";
import Booking from "../model/booking.model.js";
import User from "../model/user.model.js";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, totalRent } = req.body;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(400).json({ message: "Listing is not found" });
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid CheckIn/CheckOut data" });
    }
    if (listing.isBooked) {
      return res.status(400).json({ message: "Listing is already booked" });
    }

    const booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
    });
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: { booking: listing },
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }

    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: `Booking errro:${error}` });
  }
};
