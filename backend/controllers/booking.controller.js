import Listing from "../model/listing.model.js";
import Booking from "../model/booking.model.js";
import User from "../model/user.model.js";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, totalRent } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) return res.status(400).json({ message: "Listing not found" });
    if (new Date(checkIn) >= new Date(checkOut))
      return res.status(400).json({ message: "Invalid CheckIn/CheckOut data" });
    if (listing.isBooked)
      return res.status(400).json({ message: "Listing already booked" });

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
      { $push: { booking: listing._id } },
      { new: true }
    );

    if (!user) return res.status(400).json({ message: "User not found" });

    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();

    return res.status(201).json(booking);
  } catch (error) {
    console.error(error); // logs full error to server
    return res.status(500).json({ message: `Booking error: ${error.message}` });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { isBooked: false });

    const user = await User.findByIdAndUpdate(
      listing.guest,
      {
        $pull: { booking: listing._id },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Booking Cancel ❌" });
  } catch (error) {
    return res.status(500).json({ message: `Booking Cancel Error:${error}` });
  }
};
