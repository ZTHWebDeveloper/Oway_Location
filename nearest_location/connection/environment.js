require('dotenv').config()

const INDEX=process.env.INDEX;
const TYPE=process.env.TYPE;

const countvar={index: INDEX,type: TYPE}

const placeSearch=(keyword)=>{
    return({  
    index: INDEX,
    type: TYPE,
    size:50,
    body: {
      query: {
        match: { "Search_Name": keyword }
      },
    }
  })
}
const nearestSearch=(lat,lon)=>{
  return(
    {
      index: INDEX,
      type: TYPE,
      size: 5,
      body: {
          query :{
            bool: {
              must: {
                match_all: {}
              }
            }
          },
           sort: [
            {
              _geo_distance: {
                Location: {
                  lat: lat,
                  lon: lon
                },
                order: "asc",
                unit: "mi",
                mode: "min",
                distance_type: "arc",
                ignore_unmapped: true
              }
            }
          ]
        
      }
    }
  );
}

module.exports={
    countvar,
    placeSearch,
    nearestSearch
}