import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "purchase",
    {
      pch_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      i_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      v_code: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      pch_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      pch_pay_method: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "purchase",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "p_code" }],
        },
      ],
    }
  );
};
