const express = require("express");
const router = express.Router();
const path = require("path");
const uuid = require("../utils/helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../utils/helpers/file-handling");

// GET route to retrieve all notes from the JSON file
router.get("/", (req, res) => {
  readFromFile(path.join(__dirname, "..", "db", "db.json"))
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// GET route to retrieve a specific note by ID from the JSON file
router.get("/:id", (req, res) => {
  const noteId = req.params.id;

  readFromFile(path.join(__dirname, "..", "db", "db.json"))
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);

      return result.length > 0
        ? res.json(result)
        : res.status(404).json({ message: "Note not found" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// POST route to add a new note to the JSON file
router.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    // Create a new note with a unique ID, and provided title and text
    const newNote = {
      id: uuid(),
      title,
      text,
    };

    // Append the new note to the existing notes in the JSON file
    readAndAppend(newNote, path.join(__dirname, "..", "db", "db.json"));
    res.json(`Note added successfully`);
  } else {
    // If title or text is missing, respond with a 400 status and an error message
    res.status(400).json({ error: "Title and text are required fields" });
  }
});

// DELETE route to delete a specific note by ID from the JSON file
router.delete("/:id", (req, res) => {
  const noteId = req.params.id;

  readFromFile(path.join(__dirname, "..", "db", "db.json"))
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Filter out the note with the provided ID and write the updated notes to the file
      const result = json.filter((note) => note.id !== noteId);
      writeToFile(path.join(__dirname, "..", "db", "db.json"), result);
      res.json(`Your note with id: ${noteId} has been deleted`);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
