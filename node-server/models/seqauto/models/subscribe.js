const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscribe', {
    userUsername: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    ChildUsername: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'username'
      }
    }
  }, {
    sequelize,
    tableName: 'subscribe',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userUsername" },
          { name: "ChildUsername" },
        ]
      },
      {
        name: "ChildUsername",
        using: "BTREE",
        fields: [
          { name: "ChildUsername" },
        ]
      },
    ]
  });
};
