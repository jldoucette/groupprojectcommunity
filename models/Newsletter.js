module.exports = function(sequelize, DataTypes) {
    var Newsletter = sequelize.define("Newsletter", {
        news_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        post_title: {
            type: DataTypes.TEXT,
            validate: {
                len: [50],
                allowNull: false
            }
        },
        post_body: {
            type: DataTypes.TEXT,
            validate: {
                len: [50]
            }
        },
        post_date: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        }
    });
    return Newsletter;
}