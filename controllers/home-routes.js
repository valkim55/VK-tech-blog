// this file will have all the routes responsible for interaction with the user on the homepage
// so because you including Comment and User model in here as well, Handlebars is able to access it through the Post model and render that info to the homepage
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');

const router = require('express').Router();

//main homepage route
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'title',
            'contents',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: { model: User, attributes: ['username'] }
            },
            {
                model: User,
                attributes: ['first_name', 'last_name', 'username']
            }
        ]
    }).then(dbPostData => {
        // thanks to map() this will loop through the array of posts and and {{#each}} will render each of them to the homepage
        //console.log(dbPostData[0])
        const posts = dbPostData.map(post => {
            return post.get({ plain: true });
        })
        res.render('homepage', {posts, loggedIn: req.session.loggedIn } );
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ===== login and signup page =====
router.get('/login', (req, res) => {
    // check for a session and redirect to the homepage once the user is logged in
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// ===== GET a single post and render to the post-page.handlebars =====
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'title', 'contents', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['first_name', 'last_name', 'username'] 
            }
        ]
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'no post found with requested id'});
            return;
        }
        // serialize the data
        const post = dbPostData.get({plain: true});
        res.render('post-page', { post, loggedIn: req.session.loggedIn });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;