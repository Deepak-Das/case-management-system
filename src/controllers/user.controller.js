const { userService } = require('../services/user.service');

const getUsers = async (_req, res) => {
  // throw new Error('Something unexpected occured.');
  const users = await userService.getAll();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const user = await userService.getById(req.params.id);

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUserById,
};
