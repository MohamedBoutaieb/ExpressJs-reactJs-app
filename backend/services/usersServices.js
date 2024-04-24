const fs = require("fs");

const DATABASE = "data.json";
const getUserById = (id) => {
  const data = fs.readFileSync(DATABASE, "utf-8");
  const dataJson = JSON.parse(data);
  return dataJson.find((user) => user.id == id);
};

const getUsersPage = (page) => {
  const data = fs.readFileSync(DATABASE, "utf-8");
  const users = JSON.parse(data);
  // get 3 users per page
  const perPage = 3;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const result = users.slice(start, end);
  const tot = users.length;
  const totalPages = Math.ceil(tot / perPage);
  return {
    users: result,
    total: tot,
    totalPages: totalPages,
    page: Number(page),
  };
};

// update user
const updateUser = (id, newData) => {
    const data = fs.readFileSync(DATABASE, "utf-8");
    const users = JSON.parse(data);
    const index = users.findIndex((user) => user.id == id);
    if (index !== -1) {
        users[index] = { ...users[index], ...newData };
        fs.writeFileSync(DATABASE, JSON.stringify(users));
        return users[index];
    }
    return null;
};

// delete user 
const deleteUser = (id) => {
    const data = fs.readFileSync(DATABASE, "utf-8");
    const users = JSON.parse(data);
    const index = users.findIndex((user) => user.id == id);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        fs.writeFileSync(DATABASE, JSON.stringify(users));
        return deletedUser;
    }
    return null;
};

// add a new user
const addUser = (user) => {
    const data = fs.readFileSync(DATABASE, "utf-8");
    const users = JSON.parse(data);
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, ...user };
    users.push(newUser);
    fs.writeFileSync(DATABASE, JSON.stringify(users));
    return newUser;
};

module.exports = {
    getUserById,
    getUsersPage,
    updateUser,
    deleteUser,
    addUser
};

