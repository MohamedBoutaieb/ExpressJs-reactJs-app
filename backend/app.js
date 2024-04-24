const express = require("express");
const app = express();

const userRouter = require("./routes/users");
const bodyParser = require("body-parser");

// Enable cors at the server side. 
const cors = require('cors')
const corsOption = {
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(express.json())

app.use("/users", userRouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
}); 