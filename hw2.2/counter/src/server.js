const express = require('express');
const redis = require('redis');

const app = express();

const PORT = process.env.PORT || 3002;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';

const client = redis.createClient({url:REDIS_URL});

(async () => {
    await client.connect()
})();

app.get('/counter', (req, res) => {
  res.json({ massage : 'in redis'})

})
app.post('/counter/:bookId/incr', async (req, res) => {
    const { bookId } = req.params
    console.log('in redis')
    const cnt = await client.incr(bookId)
    res.json({ result : cnt})

})

app.get('/counter/:bookId', async (req, res) => {
    const { bookId } = req.params
    await client.get(bookId, function(err, value) {
        if (err) {
          throw err;
        }
        if (value) {
          res.json({ result : value})
        }
    });

})

app.listen(PORT)