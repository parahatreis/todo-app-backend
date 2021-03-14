const express = require('express');
const { sequelize } = require('./models');

const app = express();
// Init Middleware
app.use(express.json({
   extended: false
}));


app.get('/', (req, res) => {
   res.send('API Running!')
});


// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/todos', require('./routes/todos'));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
   console.log(`Server started on ${PORT}`);
   // Sync database
   await sequelize.authenticate()
   console.log('Database Connected')
});