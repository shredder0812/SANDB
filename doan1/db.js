
// const { Pool } = require('pg')

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'tunh',
//   password: 'tung0902',
//   port: 5432,
// })

//  module.exports = pool;
// đối tượng JSON
let json_obj = '[{"className":"AcDbLine","coords":{"x1":454828.932,"x2":454864.932,"y1":2328872.614,"y2":2328872.614,"z1":0.0,"z2":0.0},"id":1453960146576,"layer":"LK-GP2760(TDNC)","linetype":"ByLayer","linetype_scale":1.0,"lineweight":5,"material":"ByLayer","thickness":0.0,"transparency":255},{"className":"AcDbCircle","coordsRad":{"radius":4.0},"coordscenter":{"x":454820.932,"y":2328872.614,"z":0.0},"coordsnormal":{"x":0.0,"y":0.0,"z":1.0},"id":1453960146560,"layer":"LK-GP2760(TDNC)","linetype":"ByLayer","linetype_scale":1.0,"lineweight":30,"material":"ByLayer","transparency":255}]';

// chuyển đổi đối tượng JSON thành đối tượng JavaScript
let js_obj = JSON.parse(json_obj);

const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tunh',
  password: 'tung0902',
  port: 5432,
})
/*
  // duyệt qua từng đối tượng trong mảng
  for (let i = 0; i < js_obj.length; i++) {
    let obj = js_obj[i];
    console.log('Object ' + (i+1) + ':');
    console.log('className: ' + obj.className);
    console.log('id: ' + obj.id);
    console.log('layer: ' + obj.layer);
    console.log('linetype: ' + obj.linetype);
    console.log('linetype_scale: ' + obj.linetype_scale);
    console.log('lineweight: ' + obj.lineweight);
    console.log('material: ' + obj.material);
    console.log('transparency: ' + obj.transparency);

    // kiểm tra loại đối tượng để truy cập vào các thuộc tính khác nhau
    if (obj.className === 'AcDbLine') {
      console.log('x1: ' + obj.coords.x1);
      console.log('x2: ' + obj.coords.x2);
      console.log('y1: ' + obj.coords.y1);
      console.log('y2: ' + obj.coords.y2);
      console.log('z1: ' + obj.coords.z1);
      console.log('z2: ' + obj.coords.z2);

      // lưu các thuộc tính vào cơ sở dữ liệu
      let sql = "INSERT INTO objects (id,geom, layer, linetype, linetype_scale, lineweight, material, thickness, transparency) VALUES ($1,ST_GeomFromText('LINESTRING(454828.932 2328872.614, 454864.932 2328872.614)', 4326),$3,$4,$5,$6,$7,$8,$9)";
      let values = [obj.id, obj.coords.x1, obj.coords.x2, obj.coords.y1, obj.coords.y2, obj.coords.z1, obj.coords.z2, obj.layer, obj.linetype, obj.linetype_scale, obj.lineweight, obj.material, obj.thickness, obj.transparency];
      pool.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Line " + obj.id + " inserted into database.");
      });
    } else if (obj.className === 'AcDbCircle') {
      console.log('radius: ' + obj.coordsRad.radius);
      console.log('center x: ' + obj.coordscenter.x);
      console.log('center y: ' + obj.coordscenter.y);
      console.log('center z: ' + obj.coordscenter.z);
      console.log('normal x: ' + obj.coordsnormal.x);
      console.log('normal y: ' + obj.coordsnormal.y);
      console.log('normal z: ' + obj.coordsnormal.z);

      // lưu các thuộc tính vào cơ sở dữ liệu
      let sql = "INSERT INTO circles (id, radius, center_x, center_y, center_z, normal_x, normal_y, normal_z, layer, linetype, linetype_scale, lineweight, material, transparency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      let values = [obj.id, obj.coordsRad.radius, obj.coordscenter.x, obj.coordscenter.y, obj.coordscenter.z, obj.coordsnormal.x, obj.coordsnormal.y, obj.coordsnormal.z, obj.layer, obj.linetype, obj.linetype_scale, obj.lineweight, obj.material, obj.transparency];
      pool.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Circle " + obj.id + " inserted into database.");
      });
    }
  }*/
module.exports=pool;