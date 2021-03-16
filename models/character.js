module.exports = function(sequelize, DataTypes) {
  const Character = sequelize.define("Character", {
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    xp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lvl: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Character.associate = models => {
    Character.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Character;
};
