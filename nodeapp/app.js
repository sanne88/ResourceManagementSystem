const express = require("express");

const config = require('./config/dbConfig');
const app = express();
var cors = require("cors");
app.use(cors());
app.get("/api/GetResourceData", (req, res) => {
res.status(200).json({ "Skills" : [{ "SkillId": 1 , "SkillName": "JAVA"}, {"SkillId": 2 , "SkillName": "C SHARP"}]});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
