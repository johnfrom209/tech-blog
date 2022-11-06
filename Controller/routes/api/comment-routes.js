const router = require('express').Router();
const { User, Post, Comment } = require('../../../Model/models')

// `/api/comments` endpoint

// get all comments
router.get('/', async (req, res) => {

    try {
        const commentsData = await Comment.findAll({

        })
        res.status(200).json(commentsData)
    } catch (err) {
        res.status(500).json(err);
    }
})

// get comment by id
router.get('/:id', async (req, res) => {

    try {
        const commentsData = await Comment.findByPk(req.params.id, {

        })
        // if null return not found
        if (!commentsData) {
            res.status(404).json("Comment not found!")
        }
        res.status(200).json(commentsData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// create comment
router.post('/', async (req, res) => {

    try {
        //create the comment with req.body
        const commentsData = await Comment.create(req.body, {
            user_id: req.body.user_id, //temp
            post_id: req.body.post_id, //temp
            date: req.body.date, //need to modularize this. Helper?
            post_text: req.body.post_text
        });
        res.status(200).json(`Successfully Added`)
    } catch (err) {
        res.status(500).json(err);
    }
})

//update comment
router.put('/:id', async (req, res) => {

    try {
        const commentData = await Comment.update({
            post_text: req.body.post_text
        }, { where: { id: req.params.id } })
        if (!commentData) {
            res.status(404).json("Comment not found!")
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete comment
router.delete('/:id', async (req, res) => {

    try {
        const commentData = await Comment.destroy(
            { where: { id: req.params.id } }
        );
        if (!commentData) {
            res.status(404).json("Comment not Found")
        }
        res.status(200).json("Succesfully Deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;