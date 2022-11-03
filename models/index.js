// this file will collect and import all Models and create associations between them
const User = require('./User');
const Post = require('./Post');

// a User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// a Post can belong to many users
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = {User, Post};
