import express, { Router } from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { addListing, findListing, getListing } from "../controllers/listing.controller.js";

const listingRouter = express.Router();

listingRouter.post(
  "/add",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addListing
);

listingRouter.get("/get", getListing);
listingRouter.get("/findlistingbyid/:id",isAuth, findListing);

export default listingRouter;
