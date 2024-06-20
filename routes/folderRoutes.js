const express = require('express');
const { createFolder, getFolders } = require('../controller/folderController');
const router = express.Router();

router.post('/', createFolder);
router.get('/', getFolders);

module.exports = router;
