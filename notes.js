const fs = require('fs');

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    }catch(e)
    {
        return [];
    }

}

var saveNotes = (notesArray) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notesArray));
}

var addNote = (title, body) => {
    var notesArray = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notesArray.filter((note) => note.title === title);

    if(duplicateNotes.length === 0){
        notesArray.push(note);
        saveNotes(notesArray);
        return note;
    }
}

var getAll = () => {
    // console.log("Getting all notes");
    return fetchNotes();
}

var getNote = (title) => {
    // console.log("Reading notes of : ", title);
    var notesArray = fetchNotes();
    var findNote = notesArray.filter((note) => note.title === title);
    return findNote[0];
}

var removeNote = (title) => {
    // console.log("Removing notes of : ", title);
    var notesArray = fetchNotes();
    var filteredNotes = notesArray.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notesArray.length !== filteredNotes.length;
}

var logNote = (note) => {
    // debugger;
    console.log('----------------');
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};