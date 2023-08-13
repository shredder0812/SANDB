const getObject = "select * from users";
const getObjectbyID = "select * from users where id = $1";
const addOBject = "insert into users(name, email, password) values ($1, $2, $3)";
const removeObject ="delete from users where id = $1"
const updateObject ="Update users SET name = $1 where id = $2"
module.exports={
    getObject,
    getObjectbyID,
    addOBject,
    removeObject,
    updateObject,
}