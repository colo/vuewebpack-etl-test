'use strict'

//require('mootools')
//import 'mootools'

//import App from './app/'
import App from './app-http-client/index'

//import Vue from 'vue'
//import VueResource from 'vue-resource'
//Vue.use(VueResource)


//Vue.http.options.root = 'http://192.168.0.180:5984'
//Vue.http.options.root = 'http://127.0.0.1:5984'


//var console.log = require('console.log')('Server:App:Pipeline:Input:Poller:Poll:Http');
//var console.log = require('console.log')('Server:App:Pipeline:Input:Poller:Poll:Http:Events');
//var console.log = require('console.log')('Server:App:Pipeline:Input:Poller:Poll:Http:Internals');

export default new Class({
  Extends: App,
  
  options: {
		
		requests : {
			once: [
				{ api: { get: {uri: ''} } },
			],
			periodical: [
				{ api: { get: {uri: ''} } },
			],
			
		},
		
		routes: {
		},
		
		api: {
			
			version: '1.0.0',
			
			routes: {
				get: [
					{
						path: ':prop',
						callbacks: ['get'],
						//version: '',
					},
					{
						path: '',
						callbacks: ['get'],
						//version: '',
					},
				]
			},
			
		},
  },
  
  get: function(err, resp, body){
		console.log('this.get %o', body);
		
		if(err){
			console.log('this.get error %o', err);
			//this.fireEvent(this.ON_CONNECT_ERROR, err);
		}
  },
  //post: function(err, resp, body){
  //},
  /**
   * http://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects
   * 
   * */
  _flatten_obj: function(data) {
		console.log('_flatten_obj %o', data);
		
		var result = {};
		function recurse (cur, prop) {
			if (Object(cur) !== cur) {
					result[prop] = cur;
			} else if (Array.isArray(cur)) {
					 for(var i=0, l=cur.length; i<l; i++)
							 recurse(cur[i], prop + "[" + i + "]");
					if (l == 0)
							result[prop] = [];
			} else {
					var isEmpty = true;
					for (var p in cur) {
							isEmpty = false;
							recurse(cur[p], prop ? prop+"."+p : p);
					}
					if (isEmpty && prop)
							result[prop] = {};
			}
		}
		
		recurse(data, "");
		return result;
	},
	use: function(mount, app){
		console.log('use %o %o', mount, app);
		
		var id = Object.keys(this._flatten_obj(mount))[0];
		
		app.options.id = id;
		
		app.addEvent(app.ON_CONNECT_ERROR, function(err){
			console.log('app.ON_CONNECT_ERROR %o', err);
			
			this.fireEvent(this.ON_CONNECT_ERROR);
		}.bind(this));
		
		//throw new Error();									
		this.parent(mount, app);
	},
  initialize: function(options){
		//options = options || {};
		//options = Object.merge(Conf, options);
		
		this.parent(options);//override default options
		
		this.profile('root_init');//start profiling
		
		var first_connect = function(result){
			console.log('first_connect %o', result);
			
			
			this.options.id = JSON.decode(result.body).uuid;//set ID
			
			//if(Array.isArray(this.options.load)){
				//Array.each(this.options.load, function(app){
					//this.load(path.join(process.cwd(), app));
				//}.bind(this));
			//}
			//else if(this.options.load){
				//this.load(path.join(process.cwd(), this.options.load));
			//}
				
		}.bind(this);
		
		this.addEvent(this.ON_CONNECT, function(result){
			console.log('this.ON_CONNECT');
			first_connect(result);
		});
		
		this.addEvent(this.ON_CONNECT, function(){this.removeEvent(this.ON_CONNECT, first_connect)});
		
		this.profile('root_init');//end profiling
		
		this.log('root', 'info', 'root started');
  },
  connect: function(){
		console.log('this.connect');
		//console.log(this.options);
		//throw new Error();
		try{
			//this.os.api.get({uri: 'hostname'});
			this.api.get({uri: ''});
		}
		catch(e){
			console.log(e);
		}
	}
	
});


//let instance = new Vue({
	//data: function(){
		//return {
			//host: 'colo',
			//columns: {'value': 100 },
			//totalmem: 0,
			//freemem: 0,
		//}
	//},
	//watch: {
		//freemem: function(val){
			//let percentage = 100
			
			//if(this.totalmem != 0)
				//percentage -= this.freemem * 100 / this.totalmem;
			
			//percentage = percentage.toFixed(1);
			
			//this.columns = { 'value': percentage };
		//}
	//},
	
	//methods: {
		
		//getPeriodical: function(next){
			//console.log('getPeriodical...');
			
			//this.$http.get('dashboard/_design/sort/_view/by_path', {
				//params: {
					////startkey: ["os", this.host, "periodical",Date.now()],
					////endkey: ["os", this.host, "periodical", Date.now() - 10000],
					//startkey: ["os", this.host, "periodical\ufff0"],
					//endkey: ["os", this.host, "periodical"],
					//limit: 1,
					////reduce: true, //avoid geting duplicate host
					////group: true,
					//descending: true,
					//inclusive_end: true,
					//include_docs: true
				//}
			//}).then(response => {
 
				//console.log(response.body.rows);//docs
				//console.log(response.body.rows[0].doc.data);//
				
				////for (var key in response.body.rows[0].doc.data) {
					////console.log(key);
				////}
				
				//this.freemem = response.body.rows[0].doc.data['freemem'];
				//this.totalmem = response.body.rows[0].doc.data['totalmem'];
				
				//self.fireEvent('onPeriodicalDoc', [response.body, {type: 'periodical', input_type: this, app: null}]);
				
			//}, response => {
				//console.log(response);
				//self.fireEvent('onPeriodicalDocError', response.body);
				//// error callback
			//});
		//}
	//},
	//created: function (){
		//console.log('created')
		////this.getOnce();
		////this.getLastsPeriodical();
		//this.getPeriodical();
		
		////setInterval(function () {
			////this.getPeriodical();
		////}.bind(this), 1000); 
		
	//},
	////mounted: function (){
		
		//////this.getLast(console.log)
		
		////setInterval(function () {
			////this.getPeriodical();
		////}.bind(this), 1000); 
		
	////}
	////render: h => h(App)
//})
