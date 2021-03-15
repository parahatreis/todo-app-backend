const express = require('express');
const router = express.Router();
const {sequelize, User} = require('../models');

// Get all users
router.get('/',async (req, res) => {
   try {
      const users = await User.findAll();

      return res.json(users);
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
      const user = await User.findOne({
         where: { uuid },
         include : 'todos'
      });

      return res.json(user);
   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});


// Create a User
router.post('/',async (req, res) => {
   const { name, email, role } = req.body;

   try {
      const user = await User.create({ name, email, role });
      return res.json(user);
   }
   catch (error) {
      console.log(error);
      return res.status(400).json(error);
   }
})

module.exports = router;