// importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
var path = require('path');

const app = express();

const route = require('./route/routes');

// connect to mongodb
// mongoose.connect('mongodb://localhost:27017/shoppinglist');

const dbPath = "mongodb+srv://baqer:iggy5R1y8urUhxts@cluster0-2wlh3.mongodb.net/main-Naseej-letter-competetion?retryWrites=true&w=majority";
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
app.use('/api', route);




const PORT = process.env.PORT || 8080;

// Remove in Production
// app.get('/', (req, res)=> {
//     res.send('Default Rate');
//     });
    
    

    // production 
    if(process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, 'public')));
      app.get('*', (req, res) => {
        // res.sendFile(path.join(__dirname, 'public/index.html'));
         res.sendFile(path.join(__dirname, 'public',  'index.html'));
        });
    }

    


app.listen(PORT, ()=> {
    console.log('server has been started at port'+ PORT);
});




