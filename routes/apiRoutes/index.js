const {
    filterbyQuery,
    filterById,
    filterByTitle,
    createNewNote,
    validateNote,
    deleteNote,
    validateNoteId
} = require('../../lib/notes');
const notes = require('../../db/db.json');
const router = require('express').Router();

router.get('/notes',(req,res) => {
    let results = notes;
    if(req.query)
        results = filterbyQuery(req.query,results);
    res.json(results);
});

// app.get('/api/notes/:title',(req,res) => {
//     const result = filterByTitle(req.params.title,notes);
//     if(result)
//         res.json(result);
//     else
//         res.send(404);
// });

router.get('/notes/:id',(req,res) => {
    const result = filterById(req.params.id,notes);
    console.log((parseInt(notes[notes.length -1].id) + 1).toString());
    if(result)
        res.json(result);
    else
        res.send(404);
});

router.post('/notes',(req,res) => {
    //handling duplication of ids when it is deleted
    //get id of last note and then increment by 1
    req.body.id = (parseInt(notes[notes.length -1].id) + 1).toString()
    if(!validateNote(req.body))
        res.status(400).send('Given note is either null or in incorrect format');
    else{
        const note = createNewNote(req.body,notes);
        res.json(note);
    }    
});

router.delete('/notes/:id',(req,res) => {    
    if(!validateNoteId(req.params.id,notes))
        res.status(400).send('Invalid note id');      
    else {
        deleteNote(req.params.id,notes);
        res.send(`Deleted note with id: ${req.params.id}`);
    }  
});

module.exports = router;