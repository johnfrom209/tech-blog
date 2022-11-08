const { Post } = require('../../Model/models')
const router = require('express').Router();


// get all posts
router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({});

        const posts = postData.map((post) => post.get({ plain: true }));

        //gives handlebar the posts from the db
        res.render('homepage', {
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;