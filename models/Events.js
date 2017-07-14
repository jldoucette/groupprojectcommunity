module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        event_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        event_date: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 200]
            }
        },
        event_time: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        event_details: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        event_location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        event_user: {
            type:DataTypes.STRING,
            allowNull: false
        }
    });
    return Events;
}