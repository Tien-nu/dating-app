const Comment = require('../models/comment');

// GET /comments
exports.findAll = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('article');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /comments/:id
exports.findById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('article');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /comments
exports.create = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /comments/:id
exports.update = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /comments/:id
exports.delete = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }
        res.status(200).json({ message: 'Comment deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
