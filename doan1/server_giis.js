const DB_HOST = "localhost";
const DB_USERNAME = "tung";
const DB_PASSWORD = "tung";
const DB_SCHEMA = "dbsan";
const PORT = 3000;

var pg = require("pg");
var conString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_SCHEMA}`;
var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fetch = require('node-fetch')
//let importjsondata = require('./importdata/xulyarr');





async function main() {
  var client = new pg.Client(conString);

  await app.use(cors());
  await app.use(bodyParser.json());
  //localhost:3000
  await app.listen(3000, () => {
    console.log("listening");
  });
  await client.connect();
  console.log("connection established");


   await app.post('/upload', async (req, res) => {
     const data = req.body;

      var obj = JSON.parse(data);
      //var obj = JSON.parse(data.objects);
      const valuesToRemove = [undefined];


      function importPoint(){

        if (obj.objects.length > 0) {
          //var temp = "";
          
            //start loop
            return obj.objects.map((r) => 
            {
              if(r.className == "AcDbPoint")
          { 
              var tempL = "";
              tempL += r.coords.x + ` `+ r.coords.y;
    
              if(r.thickness == undefined) r.thickness = null;
              else r.thickness = r.thickness;
              if(r.closed == undefined) r.closed=null;
              else r.closed = r.closed;
              let insertPoint = `insert into public.object_details (jsondata, className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values (`+ `'` + JSON.stringify(r) + `','` + r.className +`',`+r.closed+`,'`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',ST_GeomFromText('point(`+ tempL +`)'))`               
              console.log(insertPoint);
              return insertPoint;
              
          }});} else return null;
    
    }
     function importLine(){
    
        if (obj.objects.length > 0) {
          //var temp = "";
          
            //start loop
            return obj.objects.map((r) => 
            {
              if(r.className == "AcDbLine")
          { 
              var tempL = "";
              tempL += r.coords.x1 + ` `+ r.coords.y1 +`,`+r.coords.x2+` `+r.coords.y2;
    
              if(r.thickness == undefined) r.thickness = null;
              else r.thickness = r.thickness;
              if(r.closed == undefined) r.closed=null;
              else r.closed = r.closed;
              let insertLine = `insert into public.object_details (jsondata, className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values (`+ `'` + JSON.stringify(r) + `','` + r.className +`',`+r.closed+`,'`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',ST_GeomFromText('linestring(`+ tempL +`)'))`               
              console.log(insertLine);
              return insertLine;
              
          }});} else return null;
    
    }
     function importArc(){
    
        if (obj.objects.length > 0) {
          //var temp = "";
          
            //start loop
            return obj.objects.map((r) => 
            {
              if(r.className == "AcDbArc")
          { 
              if(r.thickness == undefined) r.thickness = null;
              else r.thickness = r.thickness;
              if(r.closed == undefined) r.closed=null;
              else r.closed = r.closed;
              let insertArc = `insert into public.object_details (jsondata, className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values (`+ `'` + JSON.stringify(r) + `','` + r.className +`',`+r.closed+`,'`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',`+null+`)`             
              console.log(insertArc);
              return insertArc;
              
          }});} else return null;
    
    }
     function importPolyline(){
    
        if (obj.objects.length > 0) {
          //var temp = "";
          
            //start loop
            return obj.objects.map((r) => 
            {
              if (r.className == "AcDbPolyline") {
          
                  if (r.coords.length > 0) {
                    var tempP = "";
                    
                    //loop
                    r.coords.forEach((c) => {
                      tempP += c.x + ` ` + c.y + `,`;
                    });
                    if(r.thickness == undefined) r.thickness = null;
                    else r.thickness = r.thickness;
                  }
                  let tempPP = tempP.slice(0, -1);
                  let insertPolyline = `insert into public.object_details (jsondata, className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values (`+ `'` + JSON.stringify(r) + `','` + r.className +`','`+r.closed+`','`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',`+null+`)`   
                  console.log(insertPolyline);
    
                  return insertPolyline;
                }});} else return null;
    
    }
     function import3dPolyline(){
    
        if (obj.objects.length > 0) {
          //var temp = "";
          
            //start loop
            return obj.objects.map((r) => 
            {
              if (r.className == "AcDb3dPolyline") {
          
                  if (r.coords.length > 0) {
                    var tempP = "";
                    
                    //loop
                    r.coords.forEach((c) => {
                      tempP += c.x + ` ` + c.y + `,`;
                    });
                    if(r.thickness == undefined) r.thickness = null;
                    else r.thickness = r.thickness;
                  }
                  let tempPP = tempP.slice(0, -1);
                  let insert3dPolyline = `insert into public.object_details (jsondata, className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values (`+ `'` + JSON.stringify(r) + `','` + r.className +`','`+r.closed+`','`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',ST_GeomFromText('linestring(`+ tempPP +`)'))`
                console.log(insert3dPolyline);
                  return insert3dPolyline;
                }});} else return null;
    
    }
     function importCircle(){
    
        if (obj.objects.length > 0) {
          //var temp = "";
          
            //start loop
            return obj.objects.map((r) => 
            {
              if(r.className == "AcDbCircle")
              { 
                  var tempC1 = "";
                  var tempC2 = "";
                  var tempC3 = "";
                  var tempC4 = "";
                  tempC1 += r.coordscenter.x-r.coordsRad.radius +` `+ r.coordscenter.y 
                  tempC2 += r.coordscenter.y-r.coordsRad.radius
                  tempC3 += r.coordscenter.x+r.coordsRad.radius +` `+ r.coordscenter.y
                  tempC4 += r.coordscenter.y+r.coordsRad.radius
                  if(r.thickness == undefined) r.thickness = null;
                  else r.thickness = r.thickness;
                  if(r.closed == undefined) r.closed = null;
                  else r.closed = r.closed;
                  let insertCircle = `insert into public.object_details (jsondata, className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values (`+ `'` + JSON.stringify(r) + `','` + r.className +`',`+r.closed+`,'`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+ `',ST_GeomFromText('circularstring(`+tempC1+`, `+ r.coordscenter.x +` `+tempC2+`, `+tempC3+`, `+ r.coordscenter.x +` `+tempC4+`, `+tempC1 +`)'))`  
                  console.log(insertCircle);
                  return insertCircle;
                  
              }});} else return null;
    
    }
     function importEllipse(){
    
        if (obj.objects.length > 0) {
          //var temp = "";
          
            //start loop
            return obj.objects.map((r) => 
            {
              if(r.className == "AcDbEllipse")
          { 
              if(r.thickness == undefined) r.thickness = null;
              else r.thickness = r.thickness;
              if(r.closed == undefined) r.closed=null;
              else r.closed = r.closed;
              let insertEllipse = `insert into public.object_details (jsondata, className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values (`+ `'` + JSON.stringify(r) + `','` + r.className +`',`+r.closed+`,'`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',`+null+`)`             
              console.log(insertEllipse);
              return insertEllipse;
              
          }});} else return null;
    
    }
      var insertLineQuery = importLine()
      var insertPolylineQuery = importPolyline()
      var insert3dPolylineQuery = import3dPolyline()
      var insertArcQuery = importArc()
      var insertCircleQuery = importCircle()
      var insertPointQuery = importPoint()
      var insertEllipseQuery = importEllipse()
      //(insertLineQuery, insertPolylineQuery, insert3dPolylineQuery, insertArcQuery, insertCircleQuery, insertPointQuery, insertEllipseQuery
      //insert
      async function insert_query(){
        await client.query(insertPolylineQuery +`;`, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('Data Polyline insert successful');
      
        });
        await client.query(insertLineQuery +`;`, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('Data Line insert successful');

        });
        await client.query(insert3dPolylineQuery +`;`, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('Data 3dPolyline insert successful');
          
        });
        await client.query(insertArcQuery +`;`, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('Data Arc insert successful');
          
        });
        await client.query(insertCircleQuery +`;`, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('Data Circle insert successful');
          
        });
        await client.query(insertPointQuery +`;`, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('Data Point insert successful');
          
        });
        await client.query(insertEllipseQuery +`;`, (err, res) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log('Data Ellipse insert successful');
          
        });
      }
      await insert_query();
    //})

    await app.post("/jsondata/point", (req, res) => {
      client.query(`select jsondata from public.object_details where classname = 'AcDbPoint'; `, (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      });
  });

  await app.post("/jsondata/line", (req, res) => {
    client.query(`select jsondata from public.object_details where classname = 'AcDbLine'; `, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  });

  await app.post("/jsondata/arc", (req, res) => {
    client.query(`select jsondata from public.object_details where classname = 'AcDbArc'; `, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  });

  await app.post("/jsondata/polyline", (req, res) => {
    client.query(`select jsondata from public.object_details where classname = 'AcDbPolyline'; `, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  });

  await app.post("/jsondata/3dpolyline", (req, res) => {
    client.query(`select jsondata from public.object_details where classname = 'AcDb3dPolyline'; `, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  });

  await app.post("/jsondata/circle", (req, res) => {
    client.query(`select jsondata from public.object_details where classname = 'AcDbCircle'; `, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  });

  await app.post("/jsondata/ellipse", (req, res) => {
    client.query(`select jsondata from public.object_details where classname = 'AcDbEllipse'; `, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  });


  });
}

main();

