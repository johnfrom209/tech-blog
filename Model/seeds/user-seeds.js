const { User } = require('../models');

const userData = [
    {
        user_name: "BruceWayne",
        user_email: "notBatman@wayne.com",
        user_password: "IAmTheNight"
    },
    {
        user_name: "Barbara Gordon",
        user_email: "notBatgirl@wayne.com",
        user_password: "PapaGordonDoesn'tKnow"
    },
    {
        user_name: "Alfred",
        user_email: "butler4Hire@wayne.com",
        user_password: "15598412"
    },
    {
        user_name: "Grayson",
        user_email: "notNightwing@wayne.com",
        user_password: "IAmNotRobinAnymore"
    },
    {
        user_name: "Selina",
        user_email: "notCatwoman@wayne.com",
        user_password: "ILoveAGoodHeist"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;