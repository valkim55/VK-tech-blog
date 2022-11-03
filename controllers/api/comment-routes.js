const router = require('express').Router();
const {Comment, User, Post} = require('../../models');

// ===== GET all comments =====
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'created_at'],
        include: [ { model: User, attributes: ['username'] }, { model: Post, attributes:['title'] } ]
    }).then(dbCommentData => {
        return res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ===== POST a new comment =====
router.post('/', (req, res) => {  
    Comment.create({
        comment_text: req.body.comment_text,
        // grab user_id from the session
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }).then(dbCommentData => {
        return res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        req.status(500).json(err);
    })
    
});

// ===== UPDATE an existing comment =====
router.put('/:id', (req, res) => {
    Comment.update(
        { comment_text: req.body.comment_text },
        { where: {id: req.params.id} }
    ).then(dbCommentData => {
        if(!dbCommentData) {
            res.status(400).json({message: 'no comments found with this id'});
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ===== DELETE a comment =====
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {id: req.params.id}
    }).then(dbCommentData => {
        if(!dbCommentData) {
            return res.status(400).json({message: 'no comments found with this id'});
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;