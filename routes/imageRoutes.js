const express = require('express');
const { uploadImage, searchImages } = require('../controller/imageController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), uploadImage);
router.get('/search', searchImages);

module.exports = router;
