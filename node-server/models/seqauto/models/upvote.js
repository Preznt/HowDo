const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('upvote', {
    userUsername: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'username'
      }
    },
    boardContentBCode: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'board_content',
        key: 'b_code'
      }
    }
  }, {
    sequelize,
    tableName: 'upvote',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userUsername" },
          { name: "boardContentBCode" },
        ]
      },
      {
        name: "boardContentBCode",
        using: "BTREE",
        fields: [
          { name: "boardContentBCode" },
        ]
      },
    ]
  });
};
