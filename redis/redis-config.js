const redis = require('redis');

const redisConfig = {
    url: 'redis://localhost:6379',
    password: 'your_redis_password', // Replace with your actual password
    pingInterval: 10000, // Ping every 10 seconds
    socket: {
        reconnectStrategy: 20000 // Reconnect after 20 seconds
    }
};

const cache = redis.createClient(redisConfig);

cache.on('error', (err) => {
    console.error('Redis Client Error', err);
});
cache.on('connect', () => {
    console.log('Connected to Redis server');
});

cache.on('reconnecting', () => {
    console.log('Reconnecting to Redis server...');
});

cache.on('end', () => {
    console.log('Disconnected from Redis server');
});

if (!cache.isOpen) {
    cache.connect().catch(console.error);
}

module.exports = cache;