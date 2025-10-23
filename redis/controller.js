const redis = require('./redis-middleware');

const cacheKey = 'cache:' + req.originalUrl;
const cacheDate = {count: 42, next: null, previous: null, results: []};
redis.setCache(cacheKey, cacheDate, 600)
    .then(() => {
        console.log('Cache set successfully');
        res.status(200).json(cacheDate);
    })
    .catch((err) => {
        console.error('Error setting cache:', err);
    });
