const dbConnection = require('../database/database')


const createUser = async (payload) => {
    
    const {username, password, email} = payload
    try {
      return await dbConnection.execute("INSERT INTO users (username,password,email) VALUES (?,?,?)",[username,password,email])
    }
    catch(err) {
     return err
    }  
}


const getUser = async (payload) => {
    
    try {
      return [rows, fields] = await dbConnection.execute("SELECT * FROM `users` WHERE `email` = ?", [payload]);
    }
    catch(err) {
     return err
    }
    
}

module.exports = {
   createUser,
   getUser
}
