const express = require('express');
const router = express.Router();

router.get('/counter/:bookId', (req, res) => {
    const { bookId } = req.params;
    const value = await client.get(bookId);
});

module.exports = router;