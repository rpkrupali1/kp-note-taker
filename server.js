const express = require('express');
const res = require('express/lib/response');
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const  notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

function filterbyQuery(query,notesArray){
    let filterResults = notesArray;
    if(query.title)
        filterResults = filterResults.filter(note => note.title === query.title);
    else if (query.text)
        filterResults = filterResults.filter(note => note.text === query.text);
    return filterResults;
}

function filterByTitle(title,notesArray){
    const result = notesArray.filter(note => note.title === title)[0];
    return result;
}

function filterById(id,notesArray){
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname,'./db/db.json'),
        JSON.stringify(notesArray,null,2)
        //JSON.stringify({notes: notesArray}, null, 2)
    );
    return note;
}

function validateNote(note){
    if(!note.text || typeof note.text !== 'string')
        return false;
    if(!note.title || typeof note.title !== 'string')
        return false;
    return true;
}

function deleteNote(id, notesArray){
    const noteIndex = notesArray.findIndex(note => note.id === id);
    notesArray.splice(noteIndex,1);
    fs.writeFileSync(
        path.join(__dirname,'./db/db.json'),
        JSON.stringify(notesArray,null,2)
    );    
}

function validateNoteId(id,notesArray){
    const result = notesArray.filter(note => note.id === id).length > 0;
    return result;
}

app.get('/api/notes',(req,res) => {
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

app.get('/api/notes/:id',(req,res) => {
    const result = filterById(req.params.id,notes);
    if(result)
        res.json(result);
    else
        res.send(404);
});

app.post('/api/notes',(req,res) => {
    req.body.id = notes.length.toString();
    if(!validateNote(req.body))
        res.status(400).send('Given note is either null or in incorrect format');
    else{
        const note = createNewNote(req.body,notes);
        res.json(note);
    }    
});

app.delete('/api/notes/:id',(req,res) => {    
    if(!validateNoteId(req.params.id,notes))
        res.status(400).send('Invalid note id');      
    else {
        deleteNote(req.params.id,notes);
        res.send(`Deleted note with id: ${req.params.id}`);
    }  
});

app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}!`);
});
