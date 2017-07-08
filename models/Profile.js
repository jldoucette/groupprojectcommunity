module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define("Profile", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        user_age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_bio: {
            type:DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [50]
            }
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,   
            validate: {
                len: [10]
            }
        },
        user_password: {
            type: DataTypes.STRING,
            validate: {
                len: [4]
            }
        }
    });
    //Joining the Blog table
    Profile.associate = function(models){
        Profile.hasMany(models.Blogs, {
            onDelete: "cascade"
        });
    }
    //Joining the Classifieds table
    Profile.associate = function(models){
        Profile.hasMany(models.Classifieds, {
            onDelete: "cascade"
        });
    }
    //Joining the Comments table
    Profile.associate = function(models){
        Profile.hasMany(models.Comments, {
            onDelete: "cascade"
        });
    }

    return Profile;
}