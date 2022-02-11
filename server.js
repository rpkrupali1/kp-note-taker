const express = require('express');
const res = require('express/lib/response');
const app = express();
const  notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;

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

app.get('/api/notes',(req,res) => {
    let results = notes;
    if(req.query)
        results = filterbyQuery(req.query,results);
    res.json(results);
});

app.get('/api/notes/:title',(req,res) => {
    const result = filterByTitle(req.params.title,notes);
    if(result)
        res.json(result);
    else
        res.send(404);
});

app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}!`);
});
