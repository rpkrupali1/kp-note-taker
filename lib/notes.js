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

module.exports = {
    filterbyQuery,
    filterById,
    filterByTitle,
    createNewNote,
    validateNote,
    deleteNote,
    validateNoteId
}