const User = require("../models/User.js");
const Post = require("../models/Post.js");
const Answer = require("../models/Answer.js");
const Tag = require("../models/Tag.js");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Answer, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Post.hasMany(Answer, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Answer.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Answer.belongsTo(Post, {
  foreignKey: "post_id",
});

Post.hasOne(Tag, {
  foreignKey: "tag_id",
  onDelete: "SET NULL",
});

// Tag.belongsTo(Post)

module.exports = { User, Post, Answer, Tag };
