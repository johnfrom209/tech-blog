const Sequelize = require('sequelize');
// const { sequelize } = require('../Model/models/user');
require('dotenv').config();
let sequelize2;


//mysql://hbfgt5nfd9vq2ev5:g346j9mkquvjg71c@o2olb7w3xv09alub.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/dl9wk1svvsnzf2gl

if (process.env.JAWSDB_URL) {
    sequelize2 = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize2 = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize2;