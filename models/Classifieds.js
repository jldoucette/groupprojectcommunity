module.exports = function(sequelize, DataTypes) {
  var Classifieds = sequelize.define("Classifieds", {
    itemtitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    saleitem: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "General"
    },
    status: {
      type: DataTypes.STRING
    },
    user: {
      type: DataTypes.STRING
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue:0
    },
    price: {
      type: DataTypes.DECIMAL(13,2)
    },
    orbestoffer: {
      type: DataTypes.BOOLEAN,
      defaultValue:0
    },
    itempicturelink: {
      type: DataTypes.STRING
    }

    }
    
  );
  return Classifieds;
};