'use strict'

//require('mootools')
import 'mootools'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)


//Vue.http.options.root = 'http://192.168.0.180:5984'
Vue.http.options.root = 'http://127.0.0.1:5984'

export default new Class({
	Implements: [Options, Events],
	
	/**
	 * just for compatibility for now
	 * 
	 * */
	ON_LOAD_APP: 'onLoadApp',
  ON_USE: 'onUse',
  ON_USE_APP: 'onUseApp',
 
 
	ON_CONNECT: 'onConnect',
  ON_CONNECT_ERROR: 'onConnectError',
  /**
	 * just for compatibility for now
	 * 
	 * */
	
	options: {
		requests : {
			//once: [
				//{ api: { get: {uri: ''} } },
			//],
			periodical: [
				//{ api: { get: {uri: ''} } },
				function(){
					console.log('my periodical func')
				},
			],
			
		},
	},
	initialize(options){
		var self = this;
		console.log('init');
		this.setOptions(options);
		
		//self.fireEvent('onPeriodicalDoc', {key: 'value'});
		//this.fireEvent(this.ON_ONCE_DOC, {key: 'value'});
		
		let instance = new Vue({
			data: function(){
				return {
					host: 'colo',
					columns: {'value': 100 },
					totalmem: 0,
					freemem: 0,
				}
			},
			watch: {
				freemem: function(val){
					let percentage = 100
					
					if(this.totalmem != 0)
						percentage -= this.freemem * 100 / this.totalmem;
					
					percentage = percentage.toFixed(1);
					
					this.columns = { 'value': percentage };
				}
			},
			
			methods: {
				
				getPeriodical: function(next){
					console.log('getPeriodical...');
					
					this.$http.get('dashboard/_design/sort/_view/by_path', {
						params: {
							//startkey: ["os", this.host, "periodical",Date.now()],
							//endkey: ["os", this.host, "periodical", Date.now() - 10000],
							startkey: ["os", this.host, "periodical\ufff0"],
							endkey: ["os", this.host, "periodical"],
							limit: 1,
							//reduce: true, //avoid geting duplicate host
							//group: true,
							descending: true,
							inclusive_end: true,
							include_docs: true
						}
					}).then(response => {
		 
						console.log(response.body.rows);//docs
						console.log(response.body.rows[0].doc.data);//
						
						//for (var key in response.body.rows[0].doc.data) {
							//console.log(key);
						//}
						
						this.freemem = response.body.rows[0].doc.data['freemem'];
						this.totalmem = response.body.rows[0].doc.data['totalmem'];
						
						self.fireEvent('onPeriodicalDoc', [response.body, {type: 'periodical', input_type: this, app: null}]);
						
					}, response => {
						console.log(response);
						self.fireEvent('onPeriodicalDocError', response.body);
						// error callback
					});
				}
			},
			created: function (){
				console.log('created')
				//this.getOnce();
				//this.getLastsPeriodical();
				this.getPeriodical();
				
				//setInterval(function () {
					//this.getPeriodical();
				//}.bind(this), 1000); 
				
			},
			//mounted: function (){
				
				////this.getLast(console.log)
				
				//setInterval(function () {
					//this.getPeriodical();
				//}.bind(this), 1000); 
				
			//}
			//render: h => h(App)
		})
	}
});

//import Vue from 'vue'

//import VueResource from 'vue-resource'

//Vue.use(VueResource)

//Vue.http.options.root = 'http://192.168.0.180:5984'
////Vue.http.options.root = 'http://127.0.0.1:5984'

//module.exports = new Vue({
  ////el: '#app',
  ////components: {
		////'vue-c3-custom-element': App
	////},
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
	////computed: {
		////columns: function(){
			
			////let percentage = 100
			
			////if(this.totalmem != 0)
				////percentage -= this.freemem * 100 / this.totalmem;
			
			////console.log('used mem', percentage);
			
			////return [['used mem', percentage ] ];
		////},
	////},
	//methods: {
		////getOnce: function(next){
			////console.log('getOnce...');
			
			////this.$http.get('dashboard/_design/sort/_view/by_path', {
 				////params: {
 					////startkey: ["os", this.host, "once",Date.now()],
 					////endkey: ["os", this.host, "once", 0],
 					////limit: 1,
 					////descending: true,
 					////inclusive_end: true,
 					////include_docs: true
 				////}
 			////}).then(response => {
 
 				////// get body data
 				//////this.someData = response.body;
 				
 				////console.log(this);//docs
 				////console.log(response.body.rows);//docs
 				////console.log(response.body.rows[0].doc.data);//
 				//////for (var key in response.body.rows[0].doc.data) {
 					//////console.log(key);
 				//////}
 				
 				////this.totalmem = response.body.rows[0].doc.data;
 				
 			////}, response => {
				////console.log(response);
 				////// error callback
 			////});
 			
		////},
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
 				
 			//}, response => {
				//console.log(response);
 				//// error callback
 			//});
		//}
	//},
		////getLastsPeriodical: function(next){
			////console.log('getLastsPeriodical...');
			
			////this.$http.get('dashboard/_design/sort/_view/by_path', {
 				////params: {
 					////startkey: ["os", this.host, "periodical",Date.now()],
 					////endkey: ["os", this.host, "periodical", Date.now() - 60000],
 					////limit: 60,
 					//////reduce: true, //avoid geting duplicate host
 					//////group: true,
 					////descending: true,
 					////inclusive_end: true,
 					////include_docs: true
 				////}
 			////}).then(response => {
 
 				////// get body data
 				//////this.someData = response.body;
 				
 				////console.log(this);//docs
 				////console.log(response.body.rows);//docs
 				////console.log(response.body.rows[0].doc.data);//
 				////for (var key in response.body.rows[0].doc.data) {
 					////console.log(key);
 				////}
 				
 			////}, response => {
				////console.log(response);
 				////// error callback
 			////});
		////}
	////},
	//created: function (){
		//console.log('created')
		////this.getOnce();
		////this.getLastsPeriodical();
		//this.getPeriodical();
	//},
	//mounted: function (){
		
		////this.getLast(console.log)
		
		//setInterval(function () {
      //this.getPeriodical();
    //}.bind(this), 1000); 
    
	//}
  ////render: h => h(App)
//})
