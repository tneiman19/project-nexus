const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Answer extends Model {}

Answer.init(
  {
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    answer_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    up_votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    down_votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    like_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },

    // Foreign Keys
    post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'post_id',
        },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'answer',
  }
);

module.exports = Answer;
