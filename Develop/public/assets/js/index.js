let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn; // ✅ Ensure this is defined
let noteList;

if (window.location.pathname === "/notes") {
  noteForm = document.querySelector(".note-form");
  noteTitle = document.querySelector(".note-title");
  noteText = document.querySelector(".note-textarea");
  saveNoteBtn = document.querySelector(".save-note"); // ✅
  newNoteBtn = document.querySelector(".new-note"); // ✅
  clearBtn = document.querySelector(".clear-btn"); // ✅
  noteList = document.querySelectorAll(".list-container .list-group");
}

// Show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// Fetch all notes
const getNotes = () =>
  fetch("/api/notes", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          console.error("Server Error:", text);
          throw new Error(`Server error: ${response.status}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched Notes:", data); // ✅ Logs the response
      return data;
    })
    .catch((err) => console.error("Error fetching notes:", err));

// Save a new note
const saveNote = (note) =>
  fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Note saved:", data);
      return data;
    })
    .catch((err) => console.error("Error saving note:", err));

// Delete a note
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Note deleted:", data);
      return data;
    })
    .catch((err) => console.error("Error deleting note:", err));

// Render the currently selected note
const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);

  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute("readonly", true);
    noteText.setAttribute("readonly", true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute("readonly");
    noteText.removeAttribute("readonly");
    noteTitle.value = "";
    noteText.value = "";
  }
};

// Handle saving a note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  e.stopPropagation();
  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the active note and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
  renderActiveNote();
};

// Clears form for a new note
const handleNewNoteView = () => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

// Renders the appropriate buttons based on form state
const handleRenderBtns = () => {
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(saveNoteBtn);
    hide(clearBtn);
  } else {
    show(saveNoteBtn);
    show(clearBtn);
  }
};

// Render the list of note titles
const renderNoteList = async () => {
  try {
    const notes = await getNotes();
    console.log("Rendering Notes:", notes);

    if (window.location.pathname === "/notes") {
      noteList.forEach((el) => (el.innerHTML = ""));
    }

    let noteListItems = [];

    // Create a list item for each note
    const createLi = (text, delBtn = true) => {
      const liEl = document.createElement("li");
      liEl.classList.add("list-group-item");

      const spanEl = document.createElement("span");
      spanEl.classList.add("list-item-title");
      spanEl.innerText = text;
      spanEl.addEventListener("click", handleNoteView);

      liEl.append(spanEl);

      if (delBtn) {
        const delBtnEl = document.createElement("i");
        delBtnEl.classList.add(
          "fas",
          "fa-trash-alt",
          "float-right",
          "text-danger",
          "delete-note"
        );
        delBtnEl.addEventListener("click", handleNoteDelete);
        liEl.append(delBtnEl);
      }

      return liEl;
    };

    if (notes.length === 0) {
      noteListItems.push(createLi("No saved Notes", false));
    }

    notes.forEach((note) => {
      const li = createLi(note.title);
      li.dataset.note = JSON.stringify(note);
      noteListItems.push(li);
    });

    if (window.location.pathname === "/notes") {
      noteListItems.forEach((note) => noteList[0].append(note));
    }
  } catch (error) {
    console.error("Error rendering notes:", error);
  }
};

// Gets notes from the database and renders them in the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === "/notes") {
  saveNoteBtn.addEventListener("click", handleNoteSave);
  newNoteBtn.addEventListener("click", handleNewNoteView);
  clearBtn.addEventListener("click", renderActiveNote);
  noteForm.addEventListener("input", handleRenderBtns);
}

getAndRenderNotes();