const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, Comment, Uer, User} = require('../models');
const authorizedUser = require('../utils/auth');

router.get('/', authorizedUser, (req, res) => {
    Post.findAll({
        where: {user_id: req.session.user_id},
        attributes: ['id', 'title', 'contents', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {model: User, attributes: ['username']} 
            },
            {
                model: User,
                attributes: ['first_name', 'last_name', 'username']
            }
        ]
    }).then(dbPostData => {
        // map through the array of posts and serialize the data
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render('dashboard', {posts, loggedIn: true});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });    
});

router.get('/edit/:id', authorizedUser, (req, res) => {
    Post.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'title', 'contents', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {model: User, attributes: ['username']}
            },
            {
                model: User,
                attributes: ['first_name', 'last_name', 'username']
            }
        ]
    }).then(dbPostData => {
        if(dbPostData) {
            const post = dbPostData.get({plain: true});
            res.render('edit-post', {post, loggedIn: true})
        } else {
            res.status(404).end();
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;