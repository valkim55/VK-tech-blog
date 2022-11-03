// create a user model(table)

//import the Model class, DataTypes object from Sequelize, so User model can inherit from Model
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    //protect the password with bcrypt
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

//initialize model's data and configuration
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [5] }
        }
    },
    {
        // setup the hooks for beforeCreate and beforeUpdate to hash the password whenever it's initiated/altered
        hooks: {
            async beforeCreate(newUserPassword) {
                newUserPassword.password = await bcrypt.hash(newUserPassword.password, 10);
                return newUserPassword;
            },

            async beforeUpdate(updatedUserPassword) {
                updatedUserPassword.password = await bcrypt.hash(updatedUserPassword.password, 10);
                return updatedUserPassword;
            }
        },

        // add table configurations
        sequelize, // passing imported sequelize connection to the database
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;