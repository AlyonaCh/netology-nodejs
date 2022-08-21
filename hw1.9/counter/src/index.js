const express = require('express');
const redis  = require('redis');
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost'

const client = redis.createClient({url:REDIS_URL});

(async () => {
    await client.connect();
})

const app = express();

app.use('api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cnt = await client.incr(id);
        res.json({msg:'ghbrt', cnt});
    } catch (e) {
        console.log(e);
        res.statusCode(500).json({eror:500});
    }
    
});

// app.use('/', indexRouter);

const PORT = 3000;
app.listen(PORT);