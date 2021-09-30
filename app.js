const express = require('express')
const fetch = require('node-fetch')
const maxActivities = 100

/** This class is the object which desrbies the random activities.
 *
 */
class activities
{
	constructor(activity,type,participants,price,activityLink,key,accessibility)
	{
		this.activity = activity;	// Description of the queried activity
		this.type = type; // Type of the activity ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
		this.participants = participants; // The number of people that this activity could involve [0, n]
		this.price = price; // A factor describing the cost of the event with zero being free [0, 1]
		this.key = key; // A unique numeric id [1000000, 9999999]
		this.accessibility = accessibility; // A factor describing how possible an event is to do with zero being the most accessible [0.0, 1.0]
	}
	getActivity()
	{
		return this.activity
	}
	
}
/**This class gets all of the random activites from the 3rd party API and organizes them.
 *
 */
class getActivities
{
	allKeys = new Set();
	allActivites = [];	
	educationActivites = [];
	recreationalActivites = [];
	socialActivites = [];
	diyActivites = [];
	cookingActivites = [];
	relaxationActivites = [];
	musicActivites = [];
	charityActivites = [];
	busyworkActivites = [];

	constructor()
	{
		this.getAllItems();
		_callback();
	}
	async getAllItems()
	{
		let result = await this.getItems();
	}
	async getItems()
	{
		for (let i = 0; i < maxActivities/5; i++)
		{
			const json =  this.getJsonObj(); 
			const json1 =  this.getJsonObj(); 
			const json2 =  this.getJsonObj(); 
			const json3 =  this.getJsonObj(); 
			const json4 =  this.getJsonObj(); 
			Promise.all([json, json1, json2,json3,json4])
			.then((values) => 
			{	
				this.createNewAct(values[0]);
				this.createNewAct(values[1]);
				this.createNewAct(values[2]);
				this.createNewAct(values[3]);
				this.createNewAct(values[4]);
			});
		}
		

		
	}
	async createNewAct(json)
	{
		
		var activity = new activities(json.activity,json.type,json.participants,json.price,0,json.key,json.accessibility);	
		this.allActivites.push(activity);
		this.allKeys.add(json.key);
		switch(json.type)
		{
			case 'education':
				this.educationActivites.push(activity);
				break;
			case 'recreational':
				this.recreationalActivites.push(activity);
				break;
			case 'social':
				this.socialActivites.push(activity);
				break;
			case 'diy':
				this.diyActivites.push(activity);
				break;
			case 'charity':
				this.charityActivites.push(activity);
				break;
			case 'cooking':
				this.cookingActivites.push(activity);
				break;
			case 'relaxation':
				this.relaxationActivites.push(activity);
				break;
			case 'busywork':
				this.busyworkActivites.push(activity);
				break;
			case 'music':
				this.musicActivites.push(activity);
				break;
			default:
				console.log("Unknown activity?");
		}
	}
	async getJsonObj()
	{
		 return await fetch('https://www.boredapi.com/api/activity')
		.then(res => res.text())
		.then(parseJson => JSON.parse(parseJson))
		.then(jsonItem => {return jsonItem})
		.catch(err => { console.log(err);})
		
		
	}

	
}
function getRandom(maxNum) 
{
	return Math.floor(Math.random() * maxNum);
}

const app = express()
const port = 3000
var act = new getActivities();

app.get('/', (req, res) => {
  res.send('There is nothing here yo. \n Go to /randomActivity to get a random thing to do! Or go to one of the following for a more specific activity: \n')
})

app.get('/randomActivity', (req, res) => {
  return res.json(act.allActivites[getRandom(maxActivities)])
})

app.get('/randomActivityNoJson', (req, res) => {
  return res.json(act.allActivites[getRandom(maxActivities)].activity)
})

app.get('/educationActivites', (req, res) => {
  return res.json(act.educationActivites[getRandom(act.educationActivites.length)])
})

app.get('/recreationalActivites', (req, res) => {
  return res.json(act.recreationalActivites[getRandom(act.recreationalActivites.length)])
})
app.get('/socialActivites', (req, res) => {
  return res.json(act.socialActivites[getRandom(act.socialActivites.length)])
})
app.get('/diyActivites', (req, res) => {
  return res.json(act.diyActivites[getRandom(act.diyActivites.length)])
})
app.get('/charityActivites', (req, res) => {
  return res.json(act.charityActivites[getRandom(act.charityActivites.length)])
})
app.get('/cookingActivites', (req, res) => {
  return res.json(act.cookingActivites[getRandom(act.cookingActivites.length)])
})
app.get('/relaxationActivites', (req, res) => {
  return res.json(act.relaxationActivites[getRandom(act.relaxationActivites.length)])
})
app.get('/busyworkActivites', (req, res) => {
  return res.json(act.busyworkActivites[getRandom(act.busyworkActivites.length)])
})
app.get('/musicActivites', (req, res) => {
  return res.json(act.musicActivites[getRandom(act.musicActivites.length)])
})


app.get('/allActivites', (req, res) => {
  return res.json(populations)
})

module.exports = app;

