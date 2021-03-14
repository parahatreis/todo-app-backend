const express = require('express');
const router = express.Router();
const {sequelize, Todo, User} = require('../models');

// Get all todos
router.get('/',async (req, res) => {
   try {
      const todos = await Todo.findAll({ include: 'user' });

      return res.json(todos);
   }
   catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

// Get all user by id
router.get('/:uuid', async (req, res) => {

   const uuid = req.params.uuid;

   try {
      const todo = await Todo.findOne({
         where : { uuid }
      });

      return res.json(todo);
   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});


// Create a User
router.post('/',async (req, res) => {
   const { body, completed, userUuid  } = req.body;   

   try {
      const user = await User.findOne({ where: { uuid: userUuid } });

      const todo = await Todo.create({ body , completed, userId : user.id });

      return res.json(todo);
   }
   catch (error) {
      console.log(error);
      return res.status(400).json(error);
   }
})

module.exports = router;