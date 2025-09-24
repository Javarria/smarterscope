const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")
const port = 8080;

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

app.post("/generateScopeSheet", (req, res) => {
  console.log(req.body.address + "  <<ATTEMPT TO LOG ADDRESS")
  res.json({ message: "You've hit the /generateScopeSheet endpoint with this address: " + req.body.address });
})

app.listen(port, () => {
  console.log("SERVER STARTED ON PORT: " + port);
});
