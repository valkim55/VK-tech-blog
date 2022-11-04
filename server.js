const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

//import handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// setup middleware to access public folder
app.use(express.static(path.join(__dirname, 'public')));

// turn on the controllers
app.use(controllers);

// handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// setup connection between the server and database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`now listening on ${PORT}`));
});