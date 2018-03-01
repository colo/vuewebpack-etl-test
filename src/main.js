import Vue from 'vue'
import App from './App.vue'

import Pipeline from 'node-mngr-worker/lib/pipeline'

import osStats from './lib/os.stats'

const pipelines = []
pipelines.push(new Pipeline({
	input: [
		{
			poll: {
				id: "input.os.http",
				conn: [
					{
						scheme: 'http',
						host:'192.168.0.180',
						port: 5984,
						//module: require('./lib/os.stats'),
						module: osStats,
						//load: ['apps/info/os/']
					}
				],
				requests: {
					periodical: 10000,
				},
			},
		}
	],
	filters: [
		function(doc, opts, next){
			console.log('test filter', doc);
			next(doc);
		}
	],
	output: [
	]
}))

new Vue({
  el: '#app',
  render: h => h(App)
})
