import express from "express";
const router = express.Router();
import * as userController from "../app/controllers/userController.js";
import authMiddleware from "../app/middlewares/authMiddleware.js";

// User Controllers

// Registration
router.post("/registration", userController.Registration);

// Login
router.post("/login", userController.Login);

// Read One Profile Details 
router.get("/oneProfileDetails", authMiddleware, userController.OneProfileDetails);

// Read All Profile Details 
router.get("/allProfileDetails", authMiddleware, userController.AllProfileDetails);

// Profile Update
router.post("/profileUpdate", authMiddleware, userController.ProfileUpdate);

// Profile Delete
router.delete("/profileDelete", authMiddleware, userController.ProfileDelete);

export default router;