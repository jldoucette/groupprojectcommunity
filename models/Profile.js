sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    var profile = sequelize.define("profile", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        },
        user_age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_bio: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [1, 50]
            }
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        },
        user_password: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255]
            }
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    })
    //Joining the Blog table
    profile.associate = function (models) {
        profile.hasMany(models.Blogs, {
            onDelete: "cascade"
        });
    }
    //Joining the Classifieds table
    profile.associate = function (models) {
        profile.hasMany(models.Classifieds, {
            onDelete: "cascade"
        });
    }
    //Joining the Comments table
    profile.associate = function (models) {
        profile.hasMany(models.Comments, {
            onDelete: "cascade"
        });
    }

    return profile;
}

