const router = require('express').Router();
const bcrypt = require('bcrypt');
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
// {
//   "user_name": "Test Test",
//   "user_email": "Test@test.com",
//   "user_password": "testingtester" 
// }
router.post('/', async (req, res) => {

    try {
        //create the user with req.body
        // but first we need to hash the password
        const newUser = req.body;
        // console.log(newUser);

        newUser.user_password = await bcrypt.hash(req.body.user_password, 10);
        console.log(newUser);

        const userData = await User.create(newUser, {
            user_name: newUser.user_name,
            user_email: newUser.user_email,
            user_password: newUser.user_password
        });

        res.status(200).json(`Successfully Added`)
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
router.delete('/:id', async (req, res) => {

    try {
        const userData = await User.destroy(
            { where: { id: req.params.id } }
        );
        if (!userData) {
            res.status(404).json("Not Found")
        }
        res.status(200).json("Succesfully Deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
})

// login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { user_email: req.body.user_email } });

        if (!userData) {
            res.status(404).json({ message: 'Login failed. Please try again!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.user_password);

        console.log("found email in db");

        console.log(validPassword);
        // check if the password matches the one in the db
        // if no they are sent this message
        if (!validPassword) {
            res.status(400).json({ message: 'Login failed. Please try again!' });
            return;
        }
        // if yes they are logged in
        res.status(200).json({ message: 'You are now logged in!' });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})

module.exports = router;