// const express = require("express");
const app = express();
import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
const port = 8080;
import dotenv from "dotenv"; 
import path from "path"
import { fileURLToPath } from "url";
import GeoImageService from "./controllers/GeoImageService.js";
import LLMPromptService from "./controllers/LLMPromptService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

/////////////*************** TO RUN SERVER => node app.js *****************//////////////
// CORS (Cross-Origin Resource Sharing) to allow requests from client-side JavaScript
// running on a different origin (domain, protocol, or port) than the server.
// This is necessary because the server and client are running on different ports.
// The cors middleware will add the necessary Access-Control-Allow-Origin header to the response,
// allowing the request to be processed.

app.use(cors({
    origin: ['http://localhost:3000'], // Allow requests from localhost:3000
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'] 
}));

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.json());

// This is a route handler for the root URL ('/')
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/generateScopeSheet",  GeoImageService.getCoordinates,GeoImageService.centerCoordinates, GeoImageService.solarAerialImageCapture,  (req, res) => {
  
  //OLD MIDDLEWARE FUNCTONS FOR /GENERATESCOPESHEET : GeoImageService.getCoordinates,GeoImageService.parcelBoundryLookup, GeoImageService.captureImage,
  //console.log("The address we are using for the LM to gather diagram is: " + req.body.address )
  res.json({ message: "You've hit the /generateScopeSheet endpoint with this address: " + req.body.address });
  
})

app.listen(port, () => {
  console.log("SERVER STARTED ON PORT: " + port);
});

// const key = process.env.AZURE_MAPS_PRIMARY_KEY
// res.locals.key = key
// //console.log(req.body.address + "  <<ATTEMPT TO LOG ADDRESS")
// //res.locals.address = req.body.address
// console.log(key + "<---------------------- THIS IS THE PRIMARY KEY FOR LON & LAT")
// console.log(res.locals.key + "<---------------------- THIS IS THE PRIMARY KEY INSIDE OF RES>LOCALS")


// LLMPromptService.promptImageForSketch,