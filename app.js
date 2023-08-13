const express = require('express')
const object_routes = require('./object/routes')
const user_routes = require('./user/routes')
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
//app.use('/', express.static('./static'));

app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());
app.listen(port,(err)=>{
    console.log('server started');})

app.get('/',(req,res)=>{
     res.send('hello world');
})

app.use('/api/object', object_routes);
app.use('/api/user', user_routes);
// // app.post("/api",(req,res) =>{
// //     let username = req.body.username;
// //     let gender = req.body.gender;
// //     res.json("Day la ten nhan duoc ti client then body:"+username+", "+gender);
// // })
/*const parseIt = require('./thamkhao/thamkhao')

parseIt()*/