const redisClient = require('./redis-config');

const cache = {
    redisMiddleware: async (req, res, next) => {
        try {
            let cacheKey = '';
            let originalUrl = req.originalUrl;
            let url = (originalUrl.indexOf('?') === -1) ? originalUrl : originalUrl.substring(0, originalUrl.indexOf('?'));
            
            cacheKey = `cache:${url}`;

            if (!redisClient.isOpen) {
                await redisClient.connect();
            }
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                console.log(`Cache hit for key: ${cacheKey}`);
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send(JSON.parse(cachedData));
            } else {
                console.log(`Cache miss for key: ${cacheKey}`);
                res.locals.cacheKey = cacheKey;
                return next();
            }
        } catch (error) {
            console.error('Error connecting to Redis in middleware:', error);
            next(error);
        }   
    },
    setCache: async (key, data, expirationInSeconds = 3600) => {
        try {
            if (!redisClient.isOpen) {
                await redisClient.connect();
            }
            await redisClient.set(key, JSON.stringify(data));
            await redisClient.expire(key, expirationInSeconds);
            console.log(`Data cached with key: ${key} for ${expirationInSeconds} seconds`);
        } catch (error) {
            console.error('Error setting cache in Redis:', error);
        }
    },
    deleteCache: async (key) => {
        try {
            if (!redisClient.isOpen) {
                await redisClient.connect();
            }
            await redisClient.del(key);
            console.log(`Cache deleted for key: ${key}`);
        } catch (error) {
            console.error('Error deleting cache in Redis:', error);
        }
    }
}

module.exports = cache;