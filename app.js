//NOTE - import necessary modules
const express = require("express");
const app = express();
const itemsRoutes = require("./routes");
const ExpressError = require("./expressError");
const middleware = require("./middleware");

app.use(express.json());
app.use(middleware.logger);
app.use("/items", itemsRoutes);

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;