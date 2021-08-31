const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const app = express();
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware')
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())
// view engine
app.set('view engine', 'ejs');

// database connection
//mongoose connection
const dbURI = 'mongodb://localhost/recipeapp';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then((result)=>console.log('connected')) 
.catch((err) =>console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)
app.listen(process.env.PORT || 4000)

//cookies