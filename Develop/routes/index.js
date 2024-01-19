const express = require("express");
const notesRouter = require("./note-routes");
const app = express();

// All Routes with prefixes
app.use("/notes", notesRouter);

module.exports = app;
