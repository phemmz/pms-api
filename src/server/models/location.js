export default (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location name can not be empty',
        },
      }
    },
    female: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    male: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});

  Location.associate = models => {
    Location.hasMany(models.Location, {
      as: 'nestedLocation',
      foreignKey: 'parentLocation'
    })
  };

  return Location;
};