const express = require('express');
//const bcrypt = require('bcrypt');
const router = express.Router();

router.get("/GetResourceData", (req, res) => {
  try{
    let sql = `SELECT Skillid as value ,Name as label from Skill where IsActive=1;SELECT e.userid , s.Skillid ,s.Name from employeeskillmap e join Skill s on e.skillid=s.Skillid and s.IsActive=1 and e.userid=3;
    select  p.Name as ProjectName,p.Project_Id as ProjectId ,group_concat(s.Name) as SkillSet from employeeprojetmap e   inner join Project p on p.Project_id=e.projectid and e.isactive=1    inner join projectskillmap ps on ps.projectid=p.Project_id  inner join Skill s on ps.Skillid = s.skillid and s.IsActive=1 where e.userid=3  group by p.Project_id;select AvailableDate from Users where userid=3;`;
    req.multiple=true;
    req.db.query(
      sql,
      function (err, result) {
        if (err) res.status(500);
        res.status(200).json({ "skills": result[0], "resourceSkills":result[1],"projects":result[2],"availableDate":result[3][0].AvailableDate });
      }
    );

  // res.status(200).json(
  //     {
  //          "skills" : [{ "value": 1 , "label": "JAVA"}, {"value": 2 , "label": "C SHARP"}],
  //          "resourceSkills":[{ "UserId": 1, "SkillId":1 ,"SkillName": "JAVA"}],
  //          "availableDate": "",
  //          "projects": [{"ProjectId": 1, "ProjectName": "Project1"}, {"ProjectId":"2", "ProjectName": "Project2"}]
      
  //     });
    }
    catch(err)
    {
      console.log(err);
    }
  });

  
 router.post('/updateData', async (req, res) => {
   try {
    const { AvailableDate, Skills,userId} = req.body;
  
    //updaet skill and avilable date
    const query =
        `UPDATE Users set AvailableDate= "${AvailableDate}" where userid=${userId}`;
        console.log(Skills);
    
      req.db.query(query, function (err, result) {
        if (err) throw err;
      //  res.status(201).json({ message: "Success" });
        console.log("Number of records updated: " + result.affectedRows);
      });

    const insertquery = "INSERT INTO employeeskillmap (userid, skillid) VALUES ?";
   console.log(insertquery)
    req.db.query(insertquery, [Skills], function (err, result) {
      if (err) throw err;
      res.status(201).json({ message: "Success" });
      console.log("Number of records inserted: " + result.affectedRows);
    });
      
    
   } catch (err){
     console.log(err)
     res.status(500).send()
   }
 })

 router.post('/authenticate', (req, res) => {
  try { 
     const query = `SELECT * FROM Users where User_Email = '${req.body.email}'`
     req.db.query(query, async (err, result) => {
        if (!result || !result.length) {
           return res.status(400).send('Cannot find user')
         }
         if(req.body.password == result[0].User_Password) {
           res.status(200).json({ message: 'Success', data: result[0]})
         } else {
          res.status(400).json({ message: 'Invalid Credentials!'})
         }
     });

  } catch {
    res.status(500).send()
  }
})


  
// router.get('/:id', (req, res) => {
//    try{
//       const { id } = req.params;
//       const query = id ? `SELECT * FROM Users WHERE User_Id = ${id}`: 'SELECT * FROM Users';
//       req.db.query(query, function (err, result) {
//          if (err) throw err;
//          res.status(200).json({users: result})
//        });
//    }
//    catch(err){
//       console.log(err);
//       res.status(500).send()
//    }
//  });

//  router.post('/register', async (req, res) => {
//    try {
//     const { email} = req.body;
//     req.db.query(`Select * from Users WHERE User_Email = ${email}`, function (err, result) {
//       if (err) throw err;
//       if(result.length){
//         res.status(201).json({ message: "Already exists!" });
//       }
//     });
//      const hashedPassword = await bcrypt.hash(req.body.password1, 10);
//      const user = { ...req.body, password: hashedPassword };
//      delete user['password1'];
//      delete user['password2'];
//      const query = "INSERT INTO Users (User_First, User_Last, User_Phone, User_Address, User_Email, User_Password ) VALUES ?"
//      const values = [Object.values(user)];
//      req.db.query(query, [values], function (err, result) {
//       if (err) throw err;
//       res.status(201).json({message: 'Success'})
//       console.log("Number of records inserted: " + result.affectedRows);
//     });
     
//    } catch (err){
//      console.log(err)
//      res.status(500).send()
//    }
//  })

//  router.post('/authenticate', (req, res) => {
//    try { 
//       const query = `SELECT * FROM Users where User_Email = '${req.body.email}'`
//       req.db.query(query, async (err, result) => {
//          if (!result || !result.length) {
//             return res.status(400).send('Cannot find user')
//           }
//           if(await bcrypt.compare(req.body.password, result[0].User_Password)) {
//             res.status(200).json({ message: 'Success', data: result[0]})
//           } else {
//            res.status(400).json({ message: 'Invalid Credentials!'})
//           }
//       });

//    } catch {
//      res.status(500).send()
//    }
//  })

 module.exports = router;