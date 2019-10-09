# chester

> An app to keep track of a lot of things: links, watched movies, read books, attented events, etc.

## Build Setup

``` bash
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

## Bookmarklet

```js
javascript:(function(){var%20url%20=%20location.href;%20%20%20%20%20%20var%20title%20=%20document.title%20||%20url;%20%20%20%20%20%20window.open('https://pulsar-chester.surge.sh/links/create?url='%20+%20encodeURIComponent(url)+'&title='%20+%20encodeURIComponent(title),'_blank','height=600,width=800');})();
```
