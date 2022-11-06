const { Comment } = require('../models');

const commentData = [
    {
        user_id: 2,
        post_id: 1,
        date: "2022-11-01",
        post_text: "Is this the new support item the police say will help with crime?"
    },
    {
        user_id: 4,
        post_id: 2,
        date: "2022-11-01",
        post_text: "Looks like they need all the help they can get right now."
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;