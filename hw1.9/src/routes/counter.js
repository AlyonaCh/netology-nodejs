const express = require('express');
const router = express.Router();

router.get('/:bookId',  async (req, res) => {
    const { bookId } = req.params;
    try {
        const value = await client.get(bookId);
        res.render("book/counter", {
            title: "view",
            value: value,
        });
    } catch (e) {
        console.log(e);
        res.statusCode(500).json({eror:500});
    }  

})

module.exports = router;