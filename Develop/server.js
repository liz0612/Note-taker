const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serves static frontend files

// ✅ GET /api/notes - Returns stored notes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading notes:", err);
      return res.status(500).json({ error: "Failed to read notes" });
    }
    try {
      const notes = JSON.parse(data); // Ensures JSON is valid
      res.json(notes);
    } catch (parseError) {
      console.error("Invalid JSON format in db.json:", parseError);
      res.status(500).json({ error: "Invalid JSON format in db.json" });
    }
  });
});

// ✅ POST /api/notes - Saves a new note
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).json({ error: "Title and text are required" });
  }

  const newNote = {
    id: Date.now().toString(), // Generates a unique ID
    title,
    text,
  };

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save note" });
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to save note" });
      }
      res.json(newNote);
    });
  });
});

// ✅ DELETE /api/notes/:id - Deletes a note
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete note" });
    }

    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id !== noteId);

    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete note" });
      }
      res.json({ message: "Note deleted successfully!" });
    });
  });
});

// ✅ GET /notes - Serves the Notes Page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// ✅ Catch-All Route: Serves index.html for any unknown routes (MUST be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});