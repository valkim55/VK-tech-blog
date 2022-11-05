const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// import helpers
const helpers = require('./utils/helpers');

//import handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// import session library
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'secret message',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
};

const app = express();
const PORT = process.env.PORT || 3001;

// activate session
app.use(session(sess));

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