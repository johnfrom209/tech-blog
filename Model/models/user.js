const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class User extends Model { }

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
        sequelize,
        freezeTableName: true, //stops the sequelize from pluralrizing the table name
        underscored: true, //snakecase 
        modelName: 'user',
    }
)

module.exports = User;