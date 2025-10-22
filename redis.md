## Connect with server
redis-cli -u redis://host:port
redis-cli -u redis://username:password@host:port
redis-cli -u redis://localhost:6379

## Connection without ssl
redis-cli -h bcn-dev-redis.redis.cache.windows.net -a JCXCVBNSMHDGFJKSLSIEUURHFN

## Connection with ssl
redis-cli -h localhost -p 8000 -a JCXCVBNSMHDGFJKSLSIEUURHFN
