const router = require('express').Router();
const { User, Post, Comment } = require('../../../Model/models')

// `/api/posts` endpoint

// get all posts
router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({
            include: [{ model: User }, { model: Comment }]
        })
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
})

// get post by id
router.get('/:id', async (req, res) => {

    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        })
        // if null return not found
        if (!postData) {
            res.status(404).json("Post not found!")
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// create post
router.post('/', async (req, res) => {

    try {
        //create the post with req.body
        const postData = await Post.create(req.body, {
            user_id: req.body.id, //need to grab the user id from the person posting, this is temp
            date: req.body.date,
            post_text: req.body.post_text,
            post_title: req.body.post_title
        });
        res.status(200).json(`Successfully Added`)
    } catch (err) {
        res.status(500).json(err);
    }
})

//update text
router.put('/:id', async (req, res) => {

    try {
        const postData = await Post.update({
            post_text: req.body.post_text
        }, { where: { id: req.params.id } });
        res.status(200).json("Successfully Updated!");
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete post
router.delete('/:id', async (req, res) => {

    try {
        const postData = await Post.destroy(
            { where: { id: req.params.id } }
        );
        if (!postData) {
            res.status(404).json("Not Found")
        }
        res.status(200).json("Succesfully Deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;