const express = require('express');
const apiController = require('../controller/apiController');




const notesRouter = express.Router();
notesRouter
.route('/notes')
.get(apiController.getAllNotes)
.post(apiController.createNote);

notesRouter
.route('/notes/:id')
.get(apiController.getNote)
.patch(apiController.updateNotes)
.delete(apiController.deleteNotes);

module.exports = notesRouter;
