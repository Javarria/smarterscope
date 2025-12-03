// const express = require("express");
const app = express();
import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
const port = 8080;
import scopeController from "./controllers/scopeController.js";


// PRIMARYKEY > pP3YeszNpgkA0lmKbyOUUPR72WmweQXVqaOoMaBeipNAFUOz0HmsJQQJ99BLACYeBjFoSBy6AAAgAZMPF2Rf

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

app.post("/generateScopeSheet", scopeController.getCoordinates, (req, res) => {
  //console.log(req.body.address + "  <<ATTEMPT TO LOG ADDRESS")
  console.log("The address we are using for the LM to gather diagram is: " + req.body.address )
  res.json({ message: "You've hit the /generateScopeSheet endpoint with this address: " + req.body.address });
})

app.listen(port, () => {
  console.log("SERVER STARTED ON PORT: " + port);
});
