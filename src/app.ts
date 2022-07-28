import express from "express";
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

import path from "path";
// __dirname = path.resolve(__dirname);
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
// ... your REST API routes will go here
const routes = require("./Routes/v1");

// v1 api routes
app.use("/v1", routes);
// var publicDir = path.join(__dirname, '/public');
app.use(express.static("public"));
app.use("/images", express.static("images"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("REST API server ready at: http://localhost:" + port));
