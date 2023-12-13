const dbConnection = require('../database/database')


const create = async (payload, currentUser = {}) => {
    
    const {title, description, due_date,status} = payload
    try {
      return await dbConnection.execute("INSERT INTO tasks (title, description, due_date, status, user_id) VALUES (?,?,?,?,?)",[title, description, due_date, status, currentUser.id])
    }
    catch(err) {
     return err
    }  
}

const getUserTasks = async (currentUser={}) => {
    
    try {
      return [rows, fields] = await dbConnection.execute("SELECT * FROM `tasks` WHERE `user_id` = ?", [currentUser.id]);
    }
    catch(err) {
     return err
    }
    
}

const get = async (id) => {
    
    try {
      return [rows, fields] = await dbConnection.execute("SELECT * FROM `tasks` WHERE `id` = ?", [id]);
    }
    catch(err) {
     return err
    }
    
}

const find = async () => {
    
    try {
      return [rows, fields] = await dbConnection.execute("SELECT * FROM `tasks`");
    }
    catch(err) {
     return err
    }
    
}

const update = async (payload, id, currentUser={}) => {
    
    const {title, description, due_date,status} = payload
    try {
        [rows, fields] = await get(id)
        if(rows[0].user_id !== currentUser.id){ 
            throw new Error("Request cannot be processed")
        }
        return await dbConnection.execute("UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id=?",[title, description, due_date, status, id])
    }
    catch(err) {
     return err
    }  
}

const updateStatus = async (status,id) => {
    
    try {
      return await dbConnection.execute("UPDATE tasks SET status = ? WHERE id=?",[status, id])
    }
    catch(err) {
     return err
    }  
}

const remove = async (id, currentUser={}) => {

    try {
        [rows, fields] = await get(id)
        if(rows[0].user_id !== currentUser.id){ 
            throw new Error("Request cannot be processed")
        }
      return await dbConnection.execute("DELETE FROM tasks WHERE id=?",[id])
    }
    catch(err) {
     return err
    }  
}



module.exports = {
   create,
   get,
   find,
   update,
   remove,
   updateStatus,
   getUserTasks
}
