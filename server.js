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

app.get('/api/notes',(req,res) => {
    let results = notes;
    if(req.query)
        results = filterbyQuery(req.query,results);
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Api server now on port ${PORT}!`);
});
