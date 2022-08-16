const express = require('express');
const redis  = require('redis');
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost'

const client = redis.createClient({url:REDIS_URL})

(async () => {
    await client.connect();
})

const app = express();
app.use('/', async (req, res) => {
    try {
        const cnt = await client.incr()
        res.json(cnt)
    } catch (e) {
        console.log(e);
        res.statusCode(500).json({eror:500})
    }
    
})();

const PORT = 3000;
app.listen(PORT);