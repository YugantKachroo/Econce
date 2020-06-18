const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5eeb3d59b0f6d3415c1b9848')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Mat',
          email: 'mat@gmail.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    console.log('DB Connected');
  });

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
