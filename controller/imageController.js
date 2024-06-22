const Image = require('../model/imageModel');
const fs = require('fs');
const path = require('path');
const Folder = require('../model/folderModel');

const uploadImage = async (req, res) => {
  const { name, folder } = req.body;
  const checkFolderName = await Folder.findOne({ name:folder });
  if (!checkFolderName) {
    return res.status(400).json({ message: 'Folder does not exist' });
  }
  
  const image = new Image({
    name,
    url: req.file.path,
    folder: checkFolderName._id,
    user: req.user._id,
  });
  await image.save();
  res.status(201).json({ message: 'Image uploaded successfully' });
};

const searchImages = async (req, res) => {
  const { name } = req.query;
  const images = await Image.find({ user: req.user._id, name: new RegExp(name, 'i') });
  res.json(images);
};

module.exports = { uploadImage, searchImages };
