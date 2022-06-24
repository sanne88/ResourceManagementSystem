const express = require("express");
const router = express.Router();



router.get('/GetDashboard', async (req, res) => {
  try {
    let sql = `SELECT Skillid as value ,Name as label from Skill where IsActive=1;`;
    req.multiple=true;
    req.db.query(
      sql,
      function (err, result) {
        if (err) res.status(500);
        res.status(200).json({ "skills": result });
      }
    );
  } catch (err){
    console.log(err)
    res.status(500).send()
  }
});
router.post('/findResources', async (req, res) => {
    try {
     const { Skills,AvailableDate} = req.body;
   //filter the resources avilable
   let sql ='';
   if(Skills!=null && Skills.Length >0)
  
  sql = `SELECT u.userid as userId ,u.Username as userName,u.AvailableDate  as availableDate,u.IsActive as Status , group_concat(s.Name) as Skillset from  Users u join   employeeskillmap e on u.Userid= e.userid and u.AvailableDate <= '${AvailableDate}'  and u.IsActive=1 join Skill s on e.skillid=s.Skillid and s.IsActive=1  and s.Skillid in (?) group by  u.userid, u.Username,u.AvailableDate;`;
  else
  sql = `SELECT u.userid as userId ,u.Username as userName,u.AvailableDate  as availableDate,u.IsActive as Status , group_concat(s.Name) as Skillset from  Users u join   employeeskillmap e on u.Userid= e.userid and u.AvailableDate <= '${AvailableDate}'  and u.IsActive=1 join Skill s on e.skillid=s.Skillid and s.IsActive=1 group by  u.userid, u.Username,u.AvailableDate;`;
  
  req.db.query(
     sql,[Skills],
     function (err, result) {
    
       if (err) res.status(500);
       res.status(200).json({ "resources": result });
     }
   );

  //  res.status(200).json(
  //   {
  //        "resources" : [{ "userId": 1 , "userName": "Res1", "skillSet": "CHARP, JAVA" ,"availableDate": "","status":"" },
  //        { "userId": 2 , "userName": "Res2", "skillSet": "CHARP" ,"availableDate": "A","Status":"A" }],
         
      
    
  //   });

     
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