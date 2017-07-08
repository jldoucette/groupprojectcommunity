module.exports = function(sequelize, DataTypes) {
    var Profile = sequelize.define("Profile", {
        user_name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_age: {
            type: DataType.NUMBER,
            allowNull: false
        },
        user_bio: {
            type:DataType.TEXT,
            allowNull: true
        }
    })

}