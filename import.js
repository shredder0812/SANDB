
//fecth api
const fetch = require('node-fetch')
var json = fetch("http://172.16.68.66:3000/datatamthoi").then(
  res=>{
    res.json().then(
      data=>
      {
            //var json = `{"san":`+ data +`}`;
              //console.log( `{"san":`+ data +`}`);
        //vì json san gửi là 1 array [] nên phải biến thành 1 json quy chuẩn để xử lý cho tiện
        var jsdata = JSON.stringify(data);
        var obj = JSON.parse(`{"san":`+ jsdata +`}`);
        
        //console.log(`{"san":`+ obj +`}`);
        //console.log(obj);
        // Tạo hàm hồi quy để in giá trị lồng bên trong
function printValues(obj) {
  for (var k in obj) {
    if (obj[k] instanceof Object) {
      printValues(obj[k]);
    } else {
      console.log(obj[k]);
    }
  }
}

// In ra tất cả các giá trị

if (obj.san.length > 0) {
  //var temp = "";
  
    //start loop
    obj.san.forEach((r) => 
    {
      //polyline
      if (r.className == "AcDbPolyline") {
        
        if (r.coords.length > 0) {
          var tempP = "";
          
          //loop
          r.coords.forEach((c) => {
            //console.log(c.num);
  
            tempP += c.x + ` ` + c.y + `,`;
          });
          if(r.thickness == undefined) r.thickness = null;
          else r.thickness = `'`+r.thickness+`'`;
        }
        let tempPP = tempP.slice(0, -1);
        let insertPolyline = `insert into public.object_details (className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values ('`+ r.className +`','`+r.closed+`','`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',ST_GeomFromText('linestring(`+ tempPP +`)'))`   
        //var insertPolyline = `insert into public.geom (data) values ('`+ `ST_GeomFromText('linestring(`+ tempPP +`)'))`
       
        module.exports = {
          insertPolyline
        }
        //console.log(insertPolyline);
        //console.log(`ST_GeomFromText('linestring(` + tempPP + `)'))`);
      }

      //line
      if(r.className == "AcDbLine")
      { 
        var tempL = "";
          tempL += r.coords.x1 + ` `+ r.coords.y1 +`,`+r.coords.x2+` `+r.coords.y2;
        let insertLine = `insert into public.object_details (className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values ('`+ r.className +`','`+r.closed+`','`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',ST_GeomFromText('linestring(`+ tempL +`)'))`               
        module.exports = {
          insertLine
        }
        //console.log(insertLine);
      }


      //circle
      if(r.className == "AcDbCircle")
      { 
        
        //console.log(r.coordscenter.y+r.coordsRad.radius)
        var tempC1 = "";
        var tempC2 = "";
        var tempC3 = "";
        var tempC4 = "";
          tempC1 += r.coordscenter.x-r.coordsRad.radius +` `+ r.coordscenter.y 
          tempC2 += r.coordscenter.y-r.coordsRad.radius
          tempC3 += r.coordscenter.x+r.coordsRad.radius +` `+ r.coordscenter.y
          tempC4 += r.coordscenter.y+r.coordsRad.radius
        let insertCircle = `insert into public.object_details (className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values ('`+ r.className +`','`+r.closed+`','`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+ `',ST_GeomFromText('circularstring(`+tempC1+`, `+ r.coordscenter.x +` `+tempC2+`, `+tempC3+`, `+ r.coordscenter.x +` `+tempC4+`, `+tempC1 +`)'))`  
        module.exports = {
          insertCircle
        }
        //console.log(`insert into public.demo (name, geometric_filed) values('circle',ST_GeomFromText('circularstring(`+ tempC1+`, `+ r.coordscenter.x +` `+tempC2+`, `+tempC3+`, `+ r.coordscenter.x +` `+tempC4+`, `+tempC1 +`)'))`);
        //console.log(insertCircle);
        
      }
      //console.log(`insert into public.demo (name,geometric_filed) values` + insertLine +`,`+ insertCircle +`,`+ insertPolyline+`;`)

    }
    );
  
}
        



      }
    )});
