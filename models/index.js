// this file will collect and import all Models and create associations between them
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// a User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// one user can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// a Post can belong to many users
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// one post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// comment can belong to many users
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


// comment can belong to many posts
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});



module.exports = {User, Post, Comment};
