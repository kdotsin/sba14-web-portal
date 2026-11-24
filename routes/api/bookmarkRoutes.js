import e from "express";
import { Bookmark } from "../../models/Bookmark.js";
import { authMiddleware } from "../../utils/auth.js";

const router = e.Router();

router.use(authMiddleware);
 
router.get('/', async (req, res) => {
  try {
    const id = req.user._id;
    const notes = await Bookmark.find({ user: id });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const findBookmark = await Bookmark.findById(req.params.id);
    if (!findBookmark) {
      return res.status(404).json({ message: 'bookmark not found' });
    }
    if (findBookmark.user != req.user._id) {
      return res.status(404).json({ message: 'User is not authorize to look at this Bookmark' });
    }
    res.status(201).json(findBookmark);
  } catch (err) {
    console.error(err)
  }
})
 
router.post('/', async (req, res) => {
  try {
    const note = await Bookmark.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// PUT /api/bookmark/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    const findNote = await Bookmark.findById(req.params.id);

    if (findNote.user != req.user._id) {
      return res.status(403).json({ message: 'User is not authorized to update this Bookmark.' });
    }

    const note = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (!note) {
      return res.status(404).json({ message: 'No Bookmark found with this id!' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// DELETE /api/bookmark/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const findNote = await Bookmark.findById(req.params.id);

    if (findNote.user != req.user._id) {
      return res.status(403).json({ message: 'User is not authorized to delete this note.' });
    }

    const note = await Bookmark.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No Bookmark found with this id!' });
    }
    res.json({ message: 'Bookmark deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
export default router;