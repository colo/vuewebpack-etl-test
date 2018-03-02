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
						//host:'127.0.0.1',
						port: 5984,
						//module: require('./lib/os.stats'),
						module: osStats,
						//load: ['apps/info/os/']
					}
				],
				connect_retry_count: 1,
				connect_retry_periodical: 10000,
				requests: {
					periodical: 5000,
				},
			},
		}
	],
	filters: [
		function(doc, opts, next){
			//console.log('test filter', doc);
			let mem_doc = {totalmem: doc.totalmem, freemem: doc.freemem};
			
			next(mem_doc);
		}
	],
	output: [
		function(doc){
			doc = JSON.decode(doc)
			
			if(doc.totalmem)
				console.log(doc)//update mem widget
				
		}
	]
}))

new Vue({
  el: '#app',
  render: h => h(App)
})
