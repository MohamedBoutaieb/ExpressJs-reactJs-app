let express = require("express");
const responseHandler = require("./responseHandler");
let router = express.Router();


let users = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    actions: ["create-item", "delete-item", "edit-item", "view-item"],
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    actions: ["edit-item", "view-item"],
  },
  {
    id: 3,
    firstname: "Bob",
    lastname: "Johnson",
    email: "bob.johnson@example.com",
    actions: ["create-item", "delete-item"],
  },
];

router.get("/", (req, res, next) => {
  res.json(responseHandler(users, 200, "Users retrieved successfully"));
  next();
});
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  if (!user) {
    res.json(responseHandler(null, 404, "User not found"));
  } else {
    res.json(responseHandler(user, 200, "User retrieved successfully"));
  }
  next();
});

module.exports = router;
