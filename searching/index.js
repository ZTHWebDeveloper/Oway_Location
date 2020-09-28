const excelToJson = require('convert-excel-to-json');
const fs=require('fs');

const result=new excelToJson({
    sourceFile: './HLTY_TSP_PA_DATA.xlsx',   
    columnToKey: {
        Q: 'Longitude',
        R: 'Latitude',
        F: 'street',
        L:'sth'
    }
});
var Data=result.HLTY_Tsp_PA_Data;
var Address={
    Search_Name:"",
    Location:{
        lat:0.0,
        lon:0.0
    }
};
//clear
fs.writeFileSync('addresses.json',"");

//specify index and type names
var index={"index":
    {"_index":"location","_type":"locations"}}

console.log('appending datas...');

for( i=1;i<Data.length;i++){
    Address.Search_Name=Data[i].street+', '+Data[i].sth;
    Address.Location={lat:Data[i].Latitude,lon:Data[i].Longitude}
    // delete result.HLTY_Tsp_PA_Data[i]['street'];
    // delete result.HLTY_Tsp_PA_Data[i]['sth'];
    fs.appendFileSync('addresses.json', JSON.stringify(index)+"\n"+JSON.stringify(Address)+"\n",(data)=>{});
}

if(i=Data.length)
    console.log("successful");
else
    console.log("break in index = "+i);

