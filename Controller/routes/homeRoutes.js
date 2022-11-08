const { Post, User, Comment } = require('../../Model/models')
const router = require('express').Router();


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
        //gives handlebar the posts from the db
        res.render('homepage', {
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {

    try {
        const userData = await Post.findAll({ where: req.body.user_id })
        const userPost = userData.map((post) => post.get({ plain: true }))
        res.render('dashboard', {
            userPost
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {

    //     if (!req.session.loggedIn) {
    //         res.redirect('/login');
    //     } else {
    //         next();
    //     }

    // }, async (req, res) => {

    //     try {

    //         // find user in db by the email
    //         const userData = await User.findByPk({ where: { user_email: req.body.user_email } });

    //         // use the models checkPassword
    //         const validPassword = await userData.checkPassword(req.body.user_password);

    //         if (!validPassword) {
    //             res.status(400).json("Incorrect Password");
    //             return;
    //         }



    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     }

    res.render('login');

});

module.exports = router;