module.exports = function(sequelize, DataTypes) {
  var Blogs = sequelize.define("Blogs", {
    blogtitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    blogpost: {
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
    }
  });
   

  Blogs.associate = function(models) {
    Blogs.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };
  
  return Blogs;
};