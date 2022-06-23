const express = require("express");

const cors = require('cors');
const config = require('./config/dbConfig');

const mysql = require('mysql2');
const indexRouter = require('./routes/index');
const resourceRouter = require('./routes/resource');
const projectRouter = require('./routes/projects');
const staffRouter = require('./routes/staff');

const app = express();



// create mysql connection
 const db = mysql.createConnection(config)

// connect to mysql
db.connect(err =>{
   if(err) {
      throw err;
   }
   console.log('db connection established!');
})



// middleware

app.use(cors());
app.use(express.json());
app.use(function(req,res,next){
   req.db = db; 
   next();
});


// routes(APIs)
app.use('/api', indexRouter);
app.use('/api/resource', resourceRouter);
app.use('/api/staff', staffRouter);
app.use('/api/projects',projectRouter);



const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
