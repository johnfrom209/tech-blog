const User = require('./user');
const Post = require('./post');
const Comment = require('./comment')

User.hasMany(Post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    foreignKey: 'post_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    foreignKey: 'post_id'
})

User.hasMany(Comment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
})

module.exports = {
    User,
    Post,
    Comment
}