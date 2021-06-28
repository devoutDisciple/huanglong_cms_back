const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('bg_img', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    sort: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'bg_img',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ],
    timestamps: false,
    });
};
