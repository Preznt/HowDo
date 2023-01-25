import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "upvote",
    {
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user",
          key: "username",
        },
      },
      b_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "board_content",
          key: "b_code",
        },
      },
    },
    {
      sequelize,
      tableName: "upvote",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username" }, { name: "b_code" }],
        },
        {
          name: "b_code",
          using: "BTREE",
          fields: [{ name: "b_code" }],
        },
      ],
    }
  );
};
