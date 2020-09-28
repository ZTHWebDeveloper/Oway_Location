const client=require('../connection/connnection')
const variable=require('../connection/environment')
const express=require('express')
const route=express.Router()

route.route("/count").get((req,res)=>{
    client.count(variable.countvar)
    .then(result=>{
        res.json({count:result.count})
    })
    .catch(err=>{
        res.json({error:err})
    })
})

//search by keyword
route.route("/search/:keyword").get((req,res)=>{
    
    client.search(variable.placeSearch(req.params.keyword))
    .then(result=>{
        var info = result['hits']['hits'].map(function(i){
            return i['_source']; 
        });
        res.json(info)
  })
  .catch(err=>{
      res.json({error:err})
  })
})

//search nearest locations by a point
route.route('/search').get((req,res)=>{

    let lat=req.query.lat;
    let lon=req.query.lon;

    client.search(variable.nearestSearch(lat,lon))
     .then(results=>{
        var info = results['hits']['hits'].map(function(i){
           // return {source:i['_source'],distance:i['sort']}; 
           return i['_source'];
        });
        res.json(info);
     })
     .catch(err=>{
        res.json({error:err})
     })
})
module.exports=route;