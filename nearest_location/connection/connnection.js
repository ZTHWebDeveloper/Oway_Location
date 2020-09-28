var elasticsearch=require('elasticsearch');
require('dotenv').config()

var client = new elasticsearch.Client( {  
//   hosts: [
//     'localhost:9200'
//   ],
node: 'localhost:9200'
});

module.exports = client; 