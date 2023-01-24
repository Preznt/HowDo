import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "reply",
    {
      r_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      b_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      r_content: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      r_create_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      r_update_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      r_delete_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: true,
      },
      r_parent_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "reply",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "r_code" }],
        },
      ],
    }
  );
};
