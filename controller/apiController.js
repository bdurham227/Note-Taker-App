const fs = require('fs');
const path = require('path');
const notes = JSON.parse(
    fs.readFileSync(`${__dirname}/../Develop/db/db.json`));

//route handlers
exports.getAllNotes = (req, res) =>{
    console.log(req.requestTime)
    res
    .status(200)
    
    .json({
        status: 'success',
        results: notes.length,
        data: {
            notes
        }
        
    })
    // .sendFile(path.join(__dirname, '/../Develop/public/notes.html'))
    // .sendFile(path.join(__dirname, '/../Develop/public/notes.html'))
};
//get one note
exports.getNote = (req, res) =>{
    console.log(req.params)
    const id = req.params.id * 1;
    const note = notes.find(el => el.id === id);
    if(!note) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            note
        }
    })
};
//create a new note
exports.createNote = (req, res) => {
    // console.log(req.body);
    const newTitle = notes[notes.length - 1].title + 1;
    const newNote = Object.assign({ title: newTitle }, req.body);
    notes.push(newNote)
    fs.writeFile(`${__dirname}/Develop/db/db.json`, JSON.stringify(notes), err => {
        res.status(201).json({
            status: 'success',
            data: {
                notes: newNote
            }
        })
    }); 
};
//update Notes
exports.updateNotes = (req, res) =>{
    if(req.params.id * 1 > notes.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            note: '<Updating notes here'
        }
    })
};
//delete notes
exports.deleteNotes = (req, res) => {
    if(req.params.id * 1 > notes.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
};
// const publicDirectory1 = path.join(__dirname, '/../Develop/public/notes.html')

// const serveNotesHtml = (req, res) => {

// }