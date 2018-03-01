# vuewebpack-test

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

- Modifications:
* webpack.config.js
/**
 * for npm 'request' (https://github.com/request/request/issues/1529)
 * */
{
	test: /\.json$/,
	loader: 'json-loader'
}

/**
 * for npm 'request' (https://github.com/request/request/issues/1529)
 * */
node: {
	console: true,
	fs: 'empty',
	net: 'empty',
	tls: 'empty'
},

# npm install babel-preset-es2015 --save-dev
