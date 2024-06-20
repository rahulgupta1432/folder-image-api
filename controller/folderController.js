const Folder = require('../model/folderModel');

const createFolder = async (req, res) => {
  const { name, parent } = req.body;
  const folder = new Folder({ name, parent, user: req.user._id });
  await folder.save();
  res.status(201).json({ message: 'Folder created successfully' });
};

const getFolders = async (req, res) => {
  const folders = await Folder.find({ user: req.user._id });
  res.json(folders);
};

module.exports = { createFolder, getFolders };

