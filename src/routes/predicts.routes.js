import express from "express";
import multer from "multer";
// import { spawn } from "child_process";
// import fs from "fs";
import predictValue from '../controllers/predicts.controller.js'

const router = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Define the `/predict` route
router.post("/predicts", upload.single("file"), predictValue);

export default router;
