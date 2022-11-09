const { Post, User, Comment } = require('../../Model/models')
const router = require('express').Router();
const withAuth = require('../../utils/auth');


// get all posts
router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({

            // include: [{ model: User }, { model: Comment }]
            include: [{ model: User, attributes: ["user_name"] },
            {
                model: Comment, attributes: ["post_text", "created_at"],
                include: [{ model: User, attributes: ["user_name"] }]
            }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts);
        console.log("Logged in: " + req.session.logged_in);
        //gives handlebar the posts from the db
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {

    try {
        console.log("We are in dash");
        const userData = await Post.findAll({ where: req.session.user_id })
        const userPost = userData.map((post) => post.get({ plain: true }))
        res.render('dashboard', {
            userPost,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');

});

module.exports = router;