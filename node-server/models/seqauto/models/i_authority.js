const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('i_authority', {
    userUsername: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    imageICode: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'image',
        key: 'i_code'
      }
    }
  }, {
    sequelize,
    tableName: 'i_authority',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userUsername" },
          { name: "imageICode" },
        ]
      },
      {
        name: "imageICode",
        using: "BTREE",
        fields: [
          { name: "imageICode" },
        ]
      },
    ]
  });
};
