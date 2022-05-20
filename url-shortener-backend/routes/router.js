const express = require('express');
const router = express.Router();
const ShortUrlController = require('../controller/urlController');
router.post('/',ShortUrlController.postUrl);
router.get('/shorturl/:shortUrl',ShortUrlController.getShortUrl);
module.exports = router;