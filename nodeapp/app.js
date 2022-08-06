const express = require("express");

const cors = require('cors');
const config = require('./config/dbConfig');

const mysql = require('mysql2');
const indexRouter = require('./routes/index');
const resourceRouter = require('./routes/resource');
const projectRouter = require('./routes/projects');
const staffRouter = require('./routes/staff');

//const swaggerUI = require('swagger-ui-express');
//const swaggerJsdoc = require('swagger-jsdoc');
//const swaggerDoc=require('./swagger.json');
// const options = {
//    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
//    definition: {
//      openapi: '3.0.0',
//      info: {
//        title: 'RMS',
//        version: '1.0.0',
//      },
//    },
  
  
//    apis: ['./routes/*.js'],
//  };
 //const openapiSpecification = swaggerJsdoc(options);
 //const specs = swaggerJsDoc(options);
const app = express();
//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));



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
