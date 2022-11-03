const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on the controllers
app.use(controllers);

// setup connection between the server and database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`now listening on ${PORT}`));
});