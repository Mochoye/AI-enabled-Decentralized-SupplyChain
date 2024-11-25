import { asyncHandler } from "../utils/asyncHandler.js";
import { spawn } from "child_process";
import fs from "fs";



const predictValue = asyncHandler(async (req, res) => {
   if (!req.file) {
     return res.status(400).json({ error: "No file uploaded" });
   }

   const filePath = req.file.path;

   // Call the Python script to process the uploaded file
   const pythonProcess = spawn("python3", ["ml_model.py", filePath]);

   let result = "";
   let error = "";

   // Capture output from the Python script
   pythonProcess.stdout.on("data", (data) => {
     result += data.toString();
   });

   // Capture any errors from the Python script
   pythonProcess.stderr.on("data", (data) => {
     error += data.toString();
   });

   // Handle process completion
   pythonProcess.on("close", (code) => {
     // Clean up the uploaded file
     fs.unlinkSync(filePath);

     if (code === 0) {
       try {
         const predictions = JSON.parse(result);
         res.status(200).json({ predictions });
       } catch (parseError) {
         res.status(500).json({ error: "Failed to parse predictions" });
       }
     } else {
       console.error("Python script error:", error);
       res.status(500).json({ error: "Error running the ML model" });
     }
   });
});


export { predictValue };