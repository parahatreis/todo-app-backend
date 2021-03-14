'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate({ Todo }) {
         // define association here
         this.hasMany(Todo, { foreignKey: 'userId', as : 'todos' });
      }
      toJSON() {
         return {
            ...this.get(),
            id : undefined
         }
      }
   };
   User.init({
      uuid: {
         type: DataTypes.UUID,
         defaultValue : DataTypes.UUIDV4
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: { msg: 'User must have a name' },
            notEmpty : { msg : 'Name must not be empty'},
         }
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: { msg: 'Email must have a name' },
            notEmpty : { msg : 'Email must not be empty'},
         }
      },
      role: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notNull: { msg: 'Role must have a name' },
            notEmpty : { msg : 'Role must not be empty'},
         }
      },
   }, {
      sequelize,
      tableName : 'users',
      modelName: 'User',
   });
   return User;
};