import express from "express";

const router = express.Router();

var aircraftRoute = require("./web");

const defaultRoutes = [
  {
    path: "/aircraft",
    route: aircraftRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
router.all("*", (req, res) => {
  res.json({ message: "Invalid Page Link." });
});
