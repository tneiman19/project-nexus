const sequelize = require('../config/connection');
const { User, Post, Answer, Tag } = require('../models')

const userData = require('./userData.json');
const postData = require('./postData.json');
const answerData = require('./answerData.json');
const tagData = require('./tagData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const tags = await Tag.bulkCreate(tagData, {
     returning: true,
   });
  
   const posts = await Post.bulkCreate(postData, {
    returning: true,
  });

  const answers = await Answer.bulkCreate(answerData, {
     returning: true,
   });

  process.exit(0);
};

seedDatabase();
