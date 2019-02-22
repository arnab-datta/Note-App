const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of new note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of new note',
    demand: true,
    alias: 'b'
}

let yrg = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List of all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .argv;
    
let cmd = yrg._[0];


if(cmd === 'add'){
    var note = notes.addNote(yrg.title, yrg.body);
    if(note){
        console.log('Note is created');
        notes.logNote(note);
    }
    else {
        console.log("Note with same title already taken.");
    }
}
else if(cmd === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note => notes.logNote(note));
}
else if(cmd === 'read'){
    var note = notes.getNote(yrg.title);
    if(note){
        console.log('Note is found');
        notes.logNote(note);
    }else{
        console.log('Note not found');
    }
}
else if(cmd === 'remove'){
    var noteRemoved = notes.removeNote(yrg.title);
    var message = noteRemoved ? 'Note is removed' : 'Note not found';
    console.log(message);
}
else{
    console.log('command not recognized');
}