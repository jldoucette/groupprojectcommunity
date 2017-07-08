module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    commentpost: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
      len: [1]
    }
    },
    user: {
      type: DataTypes.STRING
    }
  });

  Comments.associate = function(models) {
    Comments.belongsTo(models.Blogs, {
      foreignKey: {
        allowNull: false
    }
  });
  };


  return Comments;
};