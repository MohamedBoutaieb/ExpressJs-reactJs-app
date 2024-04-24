let express = require("express");
const responseHandler = require("./responseHandler");
const { body, validationResult } = require("express-validator");
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
  // give me 3 other users
  {
    id: 4,
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice.johnson@example.com",
    actions: ["create-item", "delete-item", "edit-item", "view-item"],
  },
  {
    id: 5,
    firstname: "Michael",
    lastname: "Brown",
    email: "michael.brown@example.com",
    actions: ["edit-item", "view-item"],
  },
  {
    id: 6,
    firstname: "Emily",
    lastname: "Davis",
    email: "emily.davis@example.com",
    actions: ["create-item", "delete-item"],
  },
];

// get all users
router.get("/", (req, res, next) => {
  const page = req.query.page || 1;
  // get 5 users per page
  const perPage = 3;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const data = users.slice(start, end);
  const total = users.length;
  const totalPages = Math.ceil(total / perPage);
  res.json(
    responseHandler(
      { users: data, total: total, totalPages: totalPages, page: Number(page) },
      200, 
      "Users retrieved successfully"
    )
  );
  next();
});
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  if (!user) {
    res.status(404).json(responseHandler(null, 404, "User not found"));
  } else {
    res.json(responseHandler(user, 200, "User retrieved successfully"));
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
  const user = req.body;
  user["id"] = users.length + 1;
  users.push(user);
  res.status(201).json(responseHandler(user, 201, "User created successfully"));
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
  const id = req.params.id;
  const idx = users.findIndex((user) => user.id == id);
  if (idx === -1) {
    res.status(404).json(responseHandler(null, 404, "User not found"));
  } else {
    req.body.id = Number(id);
    users[idx] = req.body;
    res.json(responseHandler(users[idx], 200, "User updated successfully"));
  }
  next();
});

// delete user
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id == id);
  if (userIndex === -1) {
    res.status(404).json(responseHandler(null, 404, "User not found"));
  } else {
    users.splice(userIndex, 1);
    res.json(responseHandler(Number(id), 204, "User deleted successfully"));
  }
  next();
});

// run a specific action
router.post("/:id/actions/:action", (req, res, next) => {
  const id = req.params.id;
  const action = req.params.action;
  const user = users.find((user) => user.id == id);
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
