const {
    filterbyQuery,
    filterById,
    filterByTitle,
    createNewNote,
    validateNote,
    deleteNote,
    validateNoteId
} = require('../lib/notes');
const notes = require('../db/db.json');
const fs = require('fs');
jest.mock('fs');

test('test for filterByQuery', () => {
    const notes = [
        {
            id: 1,
            title: 'TestNote1',
            text: 'Note1 created for unit test purpose'
        },
        {
            id: 2,
            title: 'TestNote2',
            text: 'Note2 created for unit test purpose'
        },
        {
            id: 3,
            title: 'TestNote3',
            text: 'Note3 created for unit test purpose'
        }
    ];
    const actualNote = filterbyQuery({title:'TestNote2'},notes);
    expect(actualNote.length).toEqual(1);
});

test('tests for filterbyId',() => {
    const notes = [
        {
            id: '1',
            title: 'TestNote1',
            text: 'Note1 created for unit test purpose'
        },
        {
            id: '2',
            title: 'TestNote2',
            text: 'Note2 created for unit test purpose'
        },
        {
            id: '3',
            title: 'TestNote3',
            text: 'Note3 created for unit test purpose'
        }
    ];

    const filteredNote = filterById('2',notes);
    expect(filteredNote.title).toBe('TestNote2');
});

test('tests for filterbyTitle',() => {
    const notes = [
        {
            id: '1',
            title: 'TestNote1',
            text: 'Note1 created for unit test purpose'
        },
        {
            id: '2',
            title: 'TestNote2',
            text: 'Note2 created for unit test purpose'
        },
        {
            id: '3',
            title: 'TestNote3',
            text: 'Note3 created for unit test purpose'
        }
    ];

    const filteredNote = filterByTitle('TestNote2',notes);
    expect(filteredNote.id).toBe('2');
});

test('create new note', () => {
    const note = createNewNote({title:'create object test',text:'this note is created from tests'},notes);
    expect(note.title).toBe('create object test');
    expect(note.text).toBe('this note is created from tests');
});

test('test validateNote method', () => {
    const validTest = validateNote({text:'test',title: 'test'});
    const invalidTest1 = validateNote({title: 'test'});
    const invalidTest2 = validateNote({text:'test'});
    const invalidTest3 = validateNote({text:1,title: 'test'});
    expect(validTest).toBe(true);
    expect(invalidTest1).toBe(false);
    expect(invalidTest2).toBe(false);
    expect(invalidTest3).toBe(false);
});

test('test delete object', () => {
    const notes = [
        {
            id: '1',
            title: 'TestNote1',
            text: 'Note1 created for unit test purpose'
        },
        {
            id: '2',
            title: 'TestNote2',
            text: 'Note2 created for unit test purpose'
        },
        {
            id: '3',
            title: 'TestNote3',
            text: 'Note3 created for unit test purpose'
        }
    ];

    deleteNote('3',notes);
    expect(notes).toMatchObject([
        {
            id: '1',
            title: 'TestNote1',
            text: 'Note1 created for unit test purpose'
        },
        {
            id: '2',
            title: 'TestNote2',
            text: 'Note2 created for unit test purpose'
        }]);
});