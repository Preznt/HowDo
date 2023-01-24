const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_authority', {
    userUsername: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    videoVCode: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'video',
        key: 'v_code'
      }
    }
  }, {
    sequelize,
    tableName: 'v_authority',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userUsername" },
          { name: "videoVCode" },
        ]
      },
      {
        name: "videoVCode",
        using: "BTREE",
        fields: [
          { name: "videoVCode" },
        ]
      },
    ]
  });
};
