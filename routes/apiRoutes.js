// dependencies
const router = require("express").Router();
// const store = require("./../db/store");
const fs = require("fs")

// routes
router.get("notes", function (req, res) {
    fs.readFile("../db/db.json", "utf8", function(err, data){
        const notes = JSON.parse(data)
        res.json(notes)
    })
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
});

router.post("notes", function (req, res) {
    store
        .addNote(req.body)
        .then((notes) => res.json(notes))
        .catch(err => res.status(500).json(err))
});

router.delete("notes/:title", function (req, res) {
    store
        .deleteNotes(req.params.title)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
});
module.exports = router;