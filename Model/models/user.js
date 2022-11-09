const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        console.log("Checking...");
        return bcrypt.compareSync(loginPw, this.user_password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            uniqe: true,
            isAlphaNumeric: true,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [3]
            }
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
    },
    {
        // When adding hooks via the init() method, they go below
        hooks: {
            // Use the beforeCreate hook to work with data before a new instance is created
            beforeCreate: async (newUserData) => {
                // hash the password
                newUserData.user_password = await bcrypt.hash(newUserData.user_password, 10);

                // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
                newUserData.user_email = await newUserData.user_email.toLowerCase();
                return newUserData;
            },
            // Here, we use the beforeUpdate hook to make all of the characters lower case in an updated email address, before updating the database.
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.user_email = await updatedUserData.user_email.toLowerCase();
                return updatedUserData;
            },
        },
        sequelize,
        freezeTableName: true, //stops the sequelize from pluralrizing the table name
        underscored: true, //snakecase 
        modelName: 'user',
    }
)

module.exports = User;