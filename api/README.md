# Strapi application

> Chester's backend.

## Deployment

### On Heroku

```bash
# initialize the heroku project (if existing)
$ heroku git:remote -a pulsar-chester-staging

# add and commit changes
$ git add .
$ git commit -m "chore: update config"

# push to heroku
$ git push heroku master
```

Don't forget to set ENV variables on Heroku.

```
DATABASE_AUTHENTICATION_DATABASE: chester-staging
DATABASE_HOST:cluster0-shard-00-00-itqwj.mongodb.net:27017,cluster0-shard-00-01-itqwj.mongodb.net:27017,cluster0-shard-00-02-itqwj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
DATABASE_NAME: chester-staging
DATABASE_PASSWORD: <password>
DATABASE_PORT:
DATABASE_URI: mongodb://chester:<password>@cluster0-shard-00-00-itqwj.mongodb.net:27017,cluster0-shard-00-01-itqwj.mongodb.net:27017,cluster0-shard-00-02-itqwj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
DATABASE_USERNAME: chester
NODE_ENV: staging
PORT: 1337
```
