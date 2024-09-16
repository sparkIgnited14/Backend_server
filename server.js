if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');


const queryRoutes = require('./routes/queryRoutes.jsx'); // Import the routes
const reviewRoutes = require('./routes/reviewRoutes.jsx'); // Import the routes










// const dbUrl = 'mongodb://localhost:27017/yourDB' ;
const dbUrl = process.env.ATLASDB_URL;


// Connect to MongoDB
mongoose.connect(dbUrl, {
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));






// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));





const store = MongoStore.create({
  mongoUrl: dbUrl ,
  crypto: {
      secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600 ,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err) ;
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUnintialized: true,
  cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
      maxAge: 7 * 24 * 60 * 60 * 1000 ,
      httpOnly: true,
  }
} ;



app.use(session(sessionOptions)) ;

app.use(passport.initialize());
app.use(passport.session()) ;
// passport.use(new LocalStrategy(User.authenticate())) ;

// passport.serializeUser(User.serializeUser()) ;
// passport.deserializeUser(User.deserializeUser()) ;



  // Use the query routes
  app.use(queryRoutes);
  app.use(reviewRoutes);



  // useNewUrlParser: true,
  // useUnifiedTopology: true,



app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/faq', (req, res) => {
    res.send('Backend is running');
  });

// Simulating a database response for FAQs
app.get('/api/faqs', (req, res) => {
    const faqs = [
      {
        question: 'What is the range of your electric bikes?',
        answer: 'Our electric bikes offer a range of up to 100km on a single charge, depending on the model and road conditions.',
      },
      {
        question: 'How long does it take to charge the battery?',
        answer: 'It typically takes 4-5 hours for a full charge using our standard chargers.',
      },
      {
        question: 'What warranty do you offer on your vehicles?',
        answer: 'We offer a 2-year warranty on our bikes and scooters, including the battery and motor.',
      },
    ];
  
    res.json(faqs);
  });
  








//It's for A  review


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
