const express = require("express");
const router = express.Router();



router.get('/GetDashboard', async (req, res) => {
  try {
    res.status(200).json(
      {
           "skills" : [{ "value": 1 , "label": "JAVA"}, {"value": 2 , "label": "C SHARP"}],
           "availableDate": "",
        
      
      });
   
  } catch (err){
    console.log(err)
    res.status(500).send()
  }
});
router.post('/findResources', async (req, res) => {
    try {
     const { filterData} = req.body;
   //filter the resources avilable
   res.status(200).json(
    {
         "resources" : [{ "userId": 1 , "userName": "Res1", "skillSet": "CHARP, JAVA" ,"availableDate": "","status":"" },
         { "userId": 2 , "userName": "Res2", "skillSet": "CHARP" ,"availableDate": "A","Status":"A" }],
         
      
    
    });

     
    } catch (err){
      console.log(err)
      res.status(500).send()
    }
  });
  
router.post('/updateStatus', async (req, res) => {
    try {
     const { resourceData} = req.body;
     //updaet status of the resource
     
    } catch (err){
      console.log(err)
      res.status(500).send()
    }
  })
 
  
  
module.exports = router;