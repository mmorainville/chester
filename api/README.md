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

If you want to manage several remote, just rename the branch:
```
# Set git remote heroku to https://git.heroku.com/pulsar-chester-staging.git
heroku git:remote -a pulsar-chester-staging

# Next, rename the remote to something else
git remote rename heroku pulsar-chester-staging
```

Don't forget to set ENV variables on Heroku.

```
DATABASE_AUTHENTICATION_DATABASE: chester-staging
DATABASE_HOST: cluster0-shard-00-00-itqwj.mongodb.net:27017,cluster0-shard-00-01-itqwj.mongodb.net:27017,cluster0-shard-00-02-itqwj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
DATABASE_NAME: chester-staging
DATABASE_PASSWORD: <password>
DATABASE_PORT:
DATABASE_URI: mongodb://chester:<password>@cluster0-shard-00-00-itqwj.mongodb.net:27017,cluster0-shard-00-01-itqwj.mongodb.net:27017,cluster0-shard-00-02-itqwj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
DATABASE_USERNAME: chester
NODE_ENV: staging
PORT: 1337
```

Or if using PostgreSQL if your DATABASE_URL looks like this: `DATABASE_URL: postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999sb4baf@ec2-50-37-231-192.compute-2.amazonaws.com:5432/d516fp1u21ph7b`.
This url is read like so: `postgres://USERNAME:PASSWORD@HOST:PORT:DATABASE_NAME`.

```postgres://wvawylkzdjctev:72f09a79588875d55cc38a72495a1fe1c8af018a2c23b53e4e5797d77d9ef4e8@ec2-54-246-84-100.eu-west-1.compute.amazonaws.com:5432/dferrvr9rmepk5
DATABASE_USERNAME: ebitxebvixeeqd
DATABASE_PASSWORD: dc59b16dedb3a1eef84d4999sb4baf
DATABASE_HOST: ec2-50-37-231-192.compute-2.amazonaws.com
DATABASE_PORT: 5432
DATABASE_NAME: d516fp1u21ph7b
NODE_ENV: staging
PORT: 1337
```
