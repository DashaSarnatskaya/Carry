const express = require('express');
const router = express.Router();

const jsf = require('json-schema-faker');
const util = require('util')
const chance = require('chance')
const faker = require('faker')
jsf.extend('chance', () => new chance.Chance());
jsf.extend('faker', () => faker);

var schema = {
  "type": "array",
  "minItems": 10,
  "maxItems": 20,
  "items": {
	  "type": "object",
	  "properties": {
	    "name": {
	      "type": "string",
	      "faker": "name.findName"
      },
      "destination":{
        "type": "string",
        "faker":"address.city"
      },
	    "hours" : {
	      "type": "integer", 
	       "minimum": 0,
  		   "maximum": 24
      },
      "minutes" : {
	      "type": "integer", 
	      "minimum": 0,
  		  "maximum": 59
      },
      "date":{
        "type": "string",
        "faker":"date.soon"
      },
	    "status":{
        "faker":"random.boolean"
      },
      
	  },
	  "required": [
	    "name",
	    "destination", 
	    "hours",
      "minutes",
      "date",
      "status"
      
	   ]
	  }
};

/* GET home page. */
router.get('/', (req, res) => {

  jsf.resolve(schema).then(sample => {
  	   console.log(util.inspect(sample, 
  	   	{showHidden: false, depth: null}));
	   
	   res.render('journey', 
	  	{  journey:  sample });
  });

  
});

module.exports = router;
