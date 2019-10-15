# Chester

> An app to keep track of a lot of things: links, watched movies, read books, attented events, etc.

## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deployment

### On Heroku

```bash
# initialize the heroku project (if existing)
$ heroku git:remote -a pulsar-chester-client-staging

# add and commit changes
$ git add .
$ git commit -m "chore: update project"

# push to heroku
$ git push heroku master
```

Don't forget to set ENV variables on Heroku.

```
BASE_URL: https://pulsar-chester-staging.herokuapp.com/
HOST: 0.0.0.0
NODE_ENV: production
NPM_CONFIG_PRODUCTION: false
```

## Bookmarklet

Replace <host> with your host (for example: `https://pulsar-chester.surge.sh/` or `https://pulsar-chester-client-staging.herokuapp.com/`).

```js
javascript:(function(){var%20url%20=%20location.href;%20%20%20%20%20%20var%20title%20=%20document.title%20||%20url;%20%20%20%20%20%20window.open('<host>links/create?url='%20+%20encodeURIComponent(url)+'&title='%20+%20encodeURIComponent(title),'_blank','height=600,width=800');})();
```
