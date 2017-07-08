module.exports = function(sequelize, DataTypes) {
    var Events = sequelize.define("Events", {
        eventsID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        event_name: {
            type: DataTypes.TEXT,
            validate: {
                allowNull: false,
                len: [5]
            }
        },
        event_date: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false,
                isDate: true
            }
        },
        event_time: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false
            }
        },
        event_details: {
            type: DataTypes.TEXT,
            validate: {
                allowNull: false,
                len: [50]
            }
        }
    });
    return Events;
}