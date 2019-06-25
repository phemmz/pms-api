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
    },
    parentLocationId: {
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL',
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
  }, {});

  Location.associate = models => {
    Location.hasMany(models.Location, {
      as: 'nestedLocations',
      foreignKey: 'parentLocationId'
    })
  };

  return Location;
};