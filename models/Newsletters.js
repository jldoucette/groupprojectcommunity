module.exports = function(sequelize, DataTypes) {
    var Newsletters = sequelize.define("Newsletters", {
        post_title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });
    return Newsletters;
}