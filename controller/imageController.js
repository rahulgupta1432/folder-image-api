const Image = require('../model/imageModel');
const fs = require('fs');
const path = require('path');

const uploadImage = async (req, res) => {
  const { name, folder } = req.body;
  const image = new Image({
    name,
    url: req.file.path,
    folder,
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
