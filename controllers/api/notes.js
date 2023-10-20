const Note = require('../../models/note');

module.exports = {
 create, 
 index
};

async function create(req, res) {
    req.body.user = req.user._id;
    const note = await Note.create(req.body);
    try {
        await note.save();
        res.json(note);
    } catch(e) {
        console.log(e.message);
    }
}

async function index(req, res) {
    const notes = await Note.find({user: req.user._id})
    res.json(notes)
}