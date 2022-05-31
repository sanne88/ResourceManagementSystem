const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.get("/api/GetResourceData", (req, res) => {
res.status(200).send("Test World!")
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
