//require core modules
// const fs = require("fs");
//require and setup express
const express = require("express");
const morgan = require('morgan');
const app = express();
const path = require('path');
const notesRouter = require('./routes/apiRoutes');
const publicDirectory1 = path.join(__dirname, '/Develop/public')
//1) ------------MIDDLEWARE--------------------------------
app.use(morgan('dev'));
app.use(express.static(publicDirectory1));
app.use(express.urlencoded({ extended:true}));
app.use(express.json());
// app.use(express.static(path.join(__dirname)))
// app.use(express.static(publicDirectory1));
// app.get('/', (req, res) => {
//   res.sendFile(path.join((__dirname), '/Develop/public'))
// })

//our middleware
app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
})
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})
//////////////////////////////////////////////////////////////////////
app.get('/notes', (req, res) => {
    res.sendFile(path.join(publicDirectory1, 'notes.html'))
})


app.use('/notes', notesRouter)
// app.use(express.static(publicDirectory1));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(`${__dirname}, ${publicDirectory1}/index.html`))
// })


//read and parse db.json file
// const notes = JSON.parse(
//     fs.readFileSync(`${__dirname}/Develop/db/db.json`));
// //first get request sending back parsed json from our database

// //refactoring code
// //--------------------------------------------------------------------------------
// //2) ------------ROUTE HANDLERS-----------------------------
// //get All notes
// const getAllNotes = (req, res) =>{
//     console.log(req.requestTime)
//     res.status(200).json({
//         status: 'success',
//         results: notes.length,
//         data: {
//             notes
//         }
//     })
// };
// //get one note
// const getNote = (req, res) =>{
//     console.log(req.params)
//     const id = req.params.id * 1;
//     const note = notes.find(el => el.id === id);
//     if(!note) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             note
//         }
//     })
// };
// //create a new note
// const createNote = (req, res) => {
//     // console.log(req.body);
//     const newTitle = notes[notes.length - 1].title + 1;
//     const newNote = Object.assign({ title: newTitle }, req.body);
//     notes.push(newNote)
//     fs.writeFile(`${__dirname}/Develop/db/db.json`, JSON.stringify(notes), err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 notes: newNote
//             }
//         })
//     }); 
// };
// //update Notes
// const updateNotes = (req, res) =>{
//     if(req.params.id * 1 > notes.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             note: '<Updating notes here'
//         }
//     })
// };
// //delete notes
// const deleteNotes = (req, res) => {
//     if(req.params.id * 1 > notes.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// };
/////////////////////////////////////////////////////////////////////////////////


// app.get('/api/v1/notes', getAllNotes);
// app.get('/api/v1/notes/:id', getNote);
// app.post('/api/v1/notes', createNote);
// app.patch('/api/v1/notes/:id', updateNotes)
// app.delete('/api/v1/notes/:id', deleteNotes);

//further refactoring
//we can use .route() to chain route handlers for the same route path
//-------------------3) ROUTES------------------------------------------
//mounting routes
// const notesRouter = express.Router();
// notesRouter
// .route('/')
// .get(getAllNotes)
// .post(createNote);

// notesRouter
// .route('/:id')
// .get(getNote)
// .patch(updateNotes)
// .delete(deleteNotes);






// app.get('/api/v1/notes', (req, res) =>{
//     res.status(200).json({
//         status: 'success',
//         results: notes.length,
//         data: {
//             notes
//         }
//     })
// });

// app.get('/api/v1/notes/:id', (req, res) =>{
//     console.log(req.params)
//     const id = req.params.id * 1;
//     const note = notes.find(el => el.id === id);

//     if(!note) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             note
//         }
//     })
// });




// app.post('/api/v1/notes', (req, res) => {
//     // console.log(req.body);
//     const newTitle = notes[notes.length - 1].title + 1;
//     const newNote = Object.assign({ title: newTitle }, req.body);
//     notes.push(newNote)
//     fs.writeFile(`${__dirname}/Develop/db/db.json`, JSON.stringify(notes), err => {
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 notes: newNote
//             }
//         })
//     }); 
// });
//update notes
// app.patch('/api/v1/notes/:id', (req, res) =>{
//     if(req.params.id * 1 > notes.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         });
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             note: '<Updating notes here'
//         }
//     })
// })

//delete request
// app.delete('/api/v1/notes/:id', (req, res) => {
//     if(req.params.id * 1 > notes.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// })



//-------------------------4) START SERVER-----------------------------------------
//setup port and listener
const PORT = process.env.PORT || 7500;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
