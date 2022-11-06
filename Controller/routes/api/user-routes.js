const router = require('express').Router();
const { User, Post, Comment } = require('../../../Model/models')

// `/api/users` endpoint

// get all users
router.get('/', async (req, res) => {

    try {
        const userData = await User.findAll({
            include: [{ model: Post }, { model: Comment }]
        })
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
})

// get user by id
router.get('/:id', async (req, res) => {

    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: Post }, { model: Comment }]
        })
        // if null return not found
        if (!userData) {
            res.status(404).json("User not found!")
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// create user
router.post('/', async (req, res) => {

    try {
        //create the user with req.body
        const userData = await User.create(req.body);
    } catch (err) {
        res.status(500).json(err);
    }
})

//update user? name or password ?
router.put('/:id', async (req, res) => {

    try {

    } catch (err) {
        res.status(500).json(err);
    }
})

// delete user
router.delete('/', async (req, res) => {

    try {

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;