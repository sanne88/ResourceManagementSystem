const express = require("express");
const router = express.Router();


router.get("/GetProjects", (req, res) => {
    try{
      let sql = ` select  p.Name as ProjectName,p.Project_Id as ProjectId ,group_concat(s.Name) as SkillSet,p.IsActive as Status,p.TeamSize as NoOfResources  from  Project p   inner join projectskillmap ps on ps.projectid=p.Project_id  inner join Skill s on ps.Skillid = s.skillid and s.IsActive=1  group by p.Project_id;`;
      req.multiple=true;
      req.db.query(
        sql,
        function (err, result) {
          if (err) res.status(500);
          res.status(200).json({ "projects": result });
        }
      );

      
    // res.status(200).json(
    //     {
    //          "projects": [{"ProjectId": 1, "ProjectName": "Project1","SkillSet": "JAVA", "Status":"Active","StartDate":"","NoOfResources":"8" },
    //           {"ProjectId":"2", "ProjectName": "Project2","SKillSet":"C SHARP", "Status":"Active","StartDate":"","NoOfResources":"8"}]
        
    //     });
      }
      catch(err)
      {
        console.log(err);
      }
    });
  
  
// router.get("/", (req, res) => {
//   req.db.query(
//     "SELECT * FROM Events WHERE Event_IsActive = 1",
//     function (err, result) {
//       if (err) res.status(500);
//       res.status(200).json({ events: result });
//     }
//   );
// });

// router.get("/user/:id", (req, res) => {
//   const userId = req.params.id;
//   req.db.query(
//     `SELECT * FROM Events  e
//     LEFT outer JOIN  EventRegistrations er  ON e.Event_Id = er.Event_Id
//      where er.User_Id = ${userId}
//     ORDER BY e.Event_Id;`,
//     function (err, result) {
      
//       if (err){
//         console.log(err)
//         res.status(500);
//       }
//       else{
//         res.status(200).json({ events: result });
//       }
//     }
//   );
// });

// router.post("/register", (req, res) => {
//   try {
//     const { userId, eventId } = req.body;
//     req.db.query(`Select * from EventRegistrations WHERE User_Id = ${userId} AND Event_Id = ${eventId}`, function (err, result) {
//       if (err) throw err;
//       if(result.length){
//         res.status(201).json({ message: "Already exists!" });
//       }
//     });
//       const query =
//         "INSERT INTO EventRegistrations (User_Id, Event_Id) VALUES ?";
//       const values = [[userId, eventId]];
//       req.db.query(query, [values], function (err, result) {
//         if (err) throw err;
//         res.status(201).json({ message: "Success" });
//         console.log("Number of records inserted: " + result.affectedRows);
//       });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send();
//   }
// });

module.exports = router;
