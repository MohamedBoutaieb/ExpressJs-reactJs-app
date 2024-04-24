let express = require("express");
const responseHandler = require("./responseHandler");
const { body, validationResult } = require("express-validator");
let router = express.Router();
const jsondb = require("node-json-db");
const {
  getUserById,
  getUsersPage,
  updateUser,
  deleteUser,
  addUser,
} = require("../services/usersServices");

// get all users
router.get("/", (req, res, next) => {
  const page = req.query.page || 1;
  // get 3 users per page
  const result = getUsersPage(page);
  res.json(responseHandler(result, 200, "Users retrieved successfully"));
  next();
});
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const user = getUserById(id);
  if (!user) {
    res.status(404).json(responseHandler(null, 404, "User not found"));
  } else {
    res.json(responseHandler(user, 200, "User retrieveddd successfully"));
  }
  next();
});

const validator = [
  body("firstname").notEmpty().withMessage("Firstname is required"),
  body("lastname").notEmpty().withMessage("Lastname is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("actions").isArray().withMessage("Actions must be an array"),
];
router.post("/", [validator], (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(
      responseHandler({ errors: errors.array() }, 400, "bad request")
    );
  }
  const result = addUser(req.body);
  res.status(201).json(responseHandler(result, 201, "User created successfully"));
  next();
});

//update user
router.put("/:id", [[validator]], (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(
      responseHandler({ errors: errors.array() }, 400, "bad request")
    );
  }
  const result = updateUser(req.params.id, req.body);
  if (result === null) {
    res.status(404).json(responseHandler(null, 404, "User not found"));
  } else {
    res.json(responseHandler(result, 200, "User updated successfully"));
  }
  next();
});

// delete user
router.delete("/:id", (req, res, next) => {
  const result = deleteUser(req.params.id);

  if (result === null) {
    res.status(404).json(responseHandler(null, 404, "User not found"));
  } else {
    res.json(responseHandler(Number(req.params.id), 204, "User deleted successfully"));
  }
  next();
});

// run a specific action
router.post("/:id/actions/:action", (req, res, next) => {
  const id = req.params.id;
  const action = req.params.action;
  const user = getUserById(id);
  if (!user) {
    res.status(404).json(responseHandler(null, 404, "User not found"));
  } else {
    if (user.actions.includes(action)) {
      res.json(
        responseHandler(
          { id: id, action: action },
          200,
          "Action performed successfully"
        )
      );
    } else {
      res
        .status(401)
        .json(
          responseHandler(
            { id: id, action: action },
            401,
            user.firstname +
              " " +
              user.lastname +
              " does not have permission to perform this action"
          )
        );
    }
  }
  next();
});

module.exports = router;
