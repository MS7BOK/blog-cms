require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const bcrypt = require('bcrypt'); // Import bcrypt
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Handlebars setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Sequelize User model setup with bcrypt
const { DataTypes } = require('sequelize');
const User = require('./models/user'); // Make sure to adjust the path as needed

User.init(
  {
    // ... other fields
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      },
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);

// Express session setup
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Routes and controllers setup (create these files)
const routes = require('.');
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
