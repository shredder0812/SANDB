const is_number = require("is-number");

var json = `
{"san": [
    
    {
      "className": "AcDbLine",
      "coords": {
        "x1": 454828.932,
        "x2": 454864.932,
        "y1": 2328872.614,
        "y2": 2328872.614,
        "z1": 0.0,
        "z2": 0.0
      },
      "id": 1453960146576,
      "layer": "LK-GP2760(TDNC)",
      "linetype": "ByLayer",
      "linetype_scale": 1.0,
      "lineweight": 5,
      "material": "ByLayer",
      "thickness": 0.0,
      "transparency": 255
    },
    {
      "className": "AcDbCircle",
      "coordsRad": { "radius": 4.0 },
      "coordscenter": { "x": 454820.932, "y": 2328872.614, "z": 0.0 },
      "coordsnormal": { "x": 0.0, "y": 0.0, "z": 1.0 },
      "id": 1453960146560,
      "layer": "LK-GP2760(TDNC)",
      "linetype": "ByLayer",
      "linetype_scale": 1.0,
      "lineweight": 30,
      "material": "ByLayer",
      "transparency": 255
    },
    {
      "className": "AcDbPolyline",
      "closed": false,
      "coords": [
        { "num": 0, "x": 457637.00093241734, "y": 2329094.483121058 },
        { "num": 1, "x": 457629.83295922563, "y": 2329095.330465756 },
        { "num": 2, "x": 457624.75810901524, "y": 2329096.070136168 },
        { "num": 3, "x": 457620.9832668087, "y": 2329096.7316711503 },
        { "num": 4, "x": 457617.1784176674, "y": 2329097.613261048 }
      ],
      "id": 1453960145136,
      "layer": "V.10",
      "linetype": "ByLayer",
      "linetype_scale": 1.0,
      "lineweight": -1,
      "material": "ByLayer",
      "transparency": 255
    }  
  ]}
`;

// Chuyển từ đối tượng JSON thành đối tượng JS
var obj = JSON.parse(json);

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
          // if(r.closed == undefined) r.closed = null;
          // else r.closed = r.closed;
        }
        let tempPP = tempP.slice(0, -1);
        let insertPolyline = `insert into public.object_details (className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values ('`+ r.className +`','`+r.closed+`','`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',ST_GeomFromText('linestring(`+ tempPP +`)'))`   
        //var insertPolyline = `insert into public.geom (data) values ('`+ `ST_GeomFromText('linestring(`+ tempPP +`)'))`
       
        module.exports = {
          insertPolyline
        }
        console.log(insertPolyline);
        //console.log(`ST_GeomFromText('linestring(` + tempPP + `)'))`);
      }

      //line
      if(r.className == "AcDbLine")
      { 
        var tempL = "";
          tempL += r.coords.x1 + ` `+ r.coords.y1 +`,`+r.coords.x2+` `+r.coords.y2;

        if(r.thickness == undefined) r.thickness = null;
        else r.thickness = `'`+r.thickness+`'`;
        if(r.closed == undefined) r.closed=null;
        else r.closed = `'`+r.closed+`'`;
        let insertLine = `insert into public.object_details (className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values ('`+ r.className +`',`+r.closed+`,'`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+`',ST_GeomFromText('linestring(`+ tempL +`)'))`               
        module.exports = {
          insertLine
        }
        console.log(insertLine);
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
        if(r.thickness == undefined) r.thickness = null;
        else r.thickness = `'`+r.thickness+`'`;
        if(r.closed == undefined) r.closed = null;
        else r.closed = `'`+r.closed+`'`;
        let insertCircle = `insert into public.object_details (className, closed, cad_id, layer, linetype, linetype_scale, lineweight, material, thickness, transparency, coords) values ('`+ r.className +`',`+r.closed+`,'`+r.id+`','`+r.layer+`','`+r.linetype+`','`+r.linetype_scale+`','`+r.lineweight+`','`+r.material+`',`+r.thickness+`,'`+r.transparency+ `',ST_GeomFromText('circularstring(`+tempC1+`, `+ r.coordscenter.x +` `+tempC2+`, `+tempC3+`, `+ r.coordscenter.x +` `+tempC4+`, `+tempC1 +`)'))`  
        module.exports = {
          insertCircle
        }
        //console.log(`insert into public.demo (name, geometric_filed) values('circle',ST_GeomFromText('circularstring(`+ tempC1+`, `+ r.coordscenter.x +` `+tempC2+`, `+tempC3+`, `+ r.coordscenter.x +` `+tempC4+`, `+tempC1 +`)'))`);
        console.log(insertCircle);
        
      }
      //console.log(`insert into public.demo (name,geometric_filed) values` + insertLine +`,`+ insertCircle +`,`+ insertPolyline+`;`)

    }
    );
  
}