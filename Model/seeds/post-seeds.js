const { Post } = require('../models');

const postData = [
    {
        user_id: 1,
        post_title: "Wayne Industry",
        post_text: "Wayne Industry is rolling out a new product this month. Look for more detail on our website.",
        date: "2022-11-01"
    },
    {
        user_id: 2,
        post_title: "Police Pushback",
        post_text: "Police seem to be getting some pushback on the new curfew.",
        date: "2022-11-03"
    },
    {
        user_id: 3,
        post_title: "Going on Vacation",
        post_text: "Tension in Gotham is high. Seems like a great time for a vacation.",
        date: "2022-10-25"
    },
    {
        user_id: 4,
        post_title: "Testing",
        post_text: "Test Test Test",
        date: "2022-11-05"
    },
    {
        user_id: 1,
        post_title: "Unfortuneately",
        post_text: "New produt will have to wait another month for release.",
        date: "2022-11-05"
    },
]

const seedPost = () => Post.bulKCreate(postData);

module.exports = seedPost;