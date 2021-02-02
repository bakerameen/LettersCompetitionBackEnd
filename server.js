// importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
var path = require('path');

const app = express();

const teamsRoutes = require('./route/teams');
const userRoutes = require('./route/user');
const matchRoutes = require('./route/match');
const answerRoutes = require('./route/answer');

// connect to mongodb
// mongoose.connect('mongodb://localhost:27017/shoppinglist');

const dbPath = "mongodb+srv://baqer:iggy5R1y8urUhxts@cluster0-2wlh3.mongodb.net/main2020-letter-competition?retryWrites=true&w=majority";
mongoose
  .connect(dbPath, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log('error DB not Connected');
  });




// middlewear

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/teams', teamsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/answer', answerRoutes);


const PORT = process.env.PORT || 8080;

// Remove in Production
// app.get('/', (req, res)=> {
//     res.send('Default Rate');
//     });
    
    

    // production 
     app.use(express.static(path.join(__dirname, 'public')));
      app.get('*', (req, res) => {
        //res.sendFile(path.join(__dirname, 'public/index.html'));
         res.sendFile(path.join(__dirname, 'public',  'index.html'));
        });
    

    


app.listen(PORT, ()=> {
    console.log('server has been started at port'+ PORT);
});




