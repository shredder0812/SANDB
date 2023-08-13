const getUser = "select * from users";
const getUserbyID = "select * from users where id = $1";
const addUser = "insert into users(name, email, password) values ($1, $2, $3)";
const removeUser ="delete from users where id = $1"
const updateUser ="Update users SET name = $1 where id = $2"
module.exports={
    getUser,
    getUserbyID,
    addUser,
    removeUser,
    updateUser,
}