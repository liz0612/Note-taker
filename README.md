# Note Taker Starter Code
📒 Note Taker

📝 Description

The Note Taker is a simple web application that allows users to write, save, and delete notes. It utilizes an Express.js backend to store notes in a JSON file, making it easy to organize thoughts and keep track of tasks.
📸 Screenshots
![images](./Develop/public/assets/images/Screenshot%202025-02-26%20at%207.38.18 PM.png)
![images](./Develop/public/assets/images/Screenshot%202025-02-26%20at%207.38.25 PM.png)
![images](./Develop/public/assets/images/Screenshot%202025-02-26%20at%208.02.29 PM.png)
![images](./Develop/public/assets/images/Screenshot%202025-02-26%20at%208.02.33 PM.png)
🚀 Deployment
	•	GitHub Repository: https://github.com/liz0612/Note-taker
    🛠️ Technologies Used
	•	JavaScript
	•	Node.js
	•	Express.js
	•	UUID (for unique note IDs)
	•	Bootstrap (for styling)
📌 Features
	•	✅ Add New Notes - Enter a title and note content, then save it.
	•	✅ View Existing Notes - All saved notes are listed on the sidebar.
	•	✅ Delete Notes - Remove notes from the list permanently.
	•	✅ Persistent Data Storage - Notes are saved in db.json and remain after refreshing the page.
	•	✅ User-Friendly Interface - Simple and intuitive design.
    📂 File Structure
    /note-taker
│── /db
│   └── db.json
│── /public
│   ├── index.html
│   ├── notes.html
│   ├── /assets
|   |
|   |   ├── /images
|   |       └── Screenshot
|   |       └── Screenshot
|   |       └── Screenshot
|   |       └── Screenshot
│   │   ├── /css
│   │   │   └── styles.css
│   │   ├── /js
│   │   │   └── index.js
│── server.js
│── package.json
│── README.md
📥 Installation & Usage

💻 Running Locally
	1.	Clone the Repository
    git clone https://github.com/liz0612/Note-taker.git
    cd Note-taker
    npm install
    node server.js
    http://localhost:3001
    🐞 Known Issues & Debugging
	•	If notes don’t appear after saving, check the db.json file to confirm they are being saved.
	•	If the server doesn’t start, ensure all dependencies are installed using:
    npm install
    	•	Open Developer Tools (F12) → Console to check for JavaScript errors.
        👩‍💻 Author
	•	Lizbeth
	•	GitHub: liz0612
    🎯 Final Steps

✅ Replace placeholders with actual links (GitHub, Render, LinkedIn).
✅ Upload screenshots to public/assets/img/ and update paths in the README.
✅ Commit & push to GitHub:
git add .
git commit -m "Updated README"
git push origin main