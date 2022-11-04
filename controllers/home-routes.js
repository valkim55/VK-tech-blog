// this file will have all the routes responsible for interaction with the user
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models');

const router = require('express').Router();

//main homepage route
router.get('/', (req, res) => {
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
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        // pass a single post object in to the homepage template
        //console.log(dbPostData[0])
        const posts = dbPostData.map(post => {
            return post.get({ plain: true });
        })
        res.render('homepage', {posts});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;