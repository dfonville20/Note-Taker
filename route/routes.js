const router = require('express').Router()
const { writeFile } = require('fs')

let notes = (require("../db/db.json"))
console.log(notes)

router.get('/api/notes', (req, res) => {
    res.json(notes)
})

router.post('/api/notes', (req, res) => {
    console.log("comming from the post:", req.body)
    // calcualte an id for the new note
    let newId = notes.length === 0 ?  1  :  notes[notes.length - 1].id + 1   //ES6
    let newNote = req.body
    newNote.id = newId
    notes.push(newNote) 
    writeFile('./db/db.json', JSON.stringify(notes), function () {
        res.json("done")
    })

})

router.delete('/api/notes/:id', (req, res) => {
    console.log(req.params)

    let newNote = notes.filter(note => note.id !== parseInt(req.params.id)) ///ES6

    notes = newNote
    // eliminate the note from the array and rewrite the file
    writeFile('./db/db.json', JSON.stringify(notes), function () {
        res.json("done")
    })
})

module.exports = router