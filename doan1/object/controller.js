const pool = require('../db');
const queries = require('./queries');

const getObject = (req, res)=>{
    pool.query(queries.getObject, (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const addObject = (req, res)=>{
    const {name,email,password} = req.body;
    pool.query(queries.addOBject, [name,email,password], (error, results)=>{
        console.log(error, results);
        res.status(201).send('users creates successfully');
    });
} 

const getObjectbyID = (req, res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getObjectbyID, [id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const removeObject = (req, res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getObjectbyID, [id], (error, results)=>{
       const noObjectFound = !results.rows.length;
       if(noObjectFound){
            res.send("does not exists in db")
       } 
    pool.query(queries.removeObject,[id],(error,result)=>{
        if (error) throw error;
        res.status(200).send("removed successfully")
    })
    });
}

const updateObject = (req, res)=>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    pool.query(queries.getObjectbyID, [id], (error, results)=>{
        const noObjectFound = !results.rows.length;
        if(noObjectFound){
             res.send("does not exists in db")
        } 
     pool.query(queries.updateObject,[name,id],(error,result)=>{
         if (error) throw error;
         res.status(200).send("updated successfully")
     })
     });
}

const getO = (req, res)=>{
    const {data}= req.body;
    let data_object= JSON.stringify(data);
    {
        if (error) throw error;
        res.send(data_object);
    };
}

// const insertLine =(req, res)=>
module.exports={
    getObject,
    addObject,
    getObjectbyID,
    removeObject,
    updateObject,
    getO,
}