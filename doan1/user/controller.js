const pool = require('../db');
const queries = require('./queries');

const getUser = (req, res)=>{
    pool.query(queries.getUser, (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const addUser = (req, res)=>{
    const {name,email,password} = req.body;
    pool.query(queries.addUser, [name,email,password], (error, results)=>{
        console.log(error, results);
        res.status(201).send('users creates successfully');
    });
} 

const getUserbyID = (req, res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getUserbyID, [id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const removeUser = (req, res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getUserbyID, [id], (error, results)=>{
       const noUserFound = !results.rows.length;
       if(noUserFound){
            res.send("does not exists in db")
       } 
    pool.query(queries.removeUser,[id],(error,result)=>{
        if (error) throw error;
        res.status(200).send("removed successfully")
    })
    });
}

const updateUser = (req, res)=>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    pool.query(queries.getUserbyID, [id], (error, results)=>{
        const noUserFound = !results.rows.length;
        if(noUserFound){
             res.send("does not exists in db")
        } 
     pool.query(queries.updateUser,[name,id],(error,result)=>{
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
    getUser,
    addUser,
    getUserbyID,
    removeUser,
    updateUser,
    getO,
}