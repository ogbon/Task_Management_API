const { create,
        get,
        find,
        update,
        remove,
        updateStatus,
        getUserTasks,
      } = require('../models/task')
const dbConnection = require('../database/database') 
const {pagination,totalPage} = require('../helpers/tools')      



const createTask = async (req, res) => {
   
   try {
    let task = await create(req.body, req.decoded)
    
    if(task[0].insertId){
       const [rows,fields] = await get(task[0].insertId)
       res.status(201).send({data: rows[0], message: null, success: true})
    }else{
       res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
   }catch(err){
    res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
   }

}

const getTask = async (req, res) => {

    try {
     let [rows,fields] = await get(req.params.id)
     res.status(200).send({data: rows[0], message: null, success: true})
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const getAllTasks = async (req, res) => {
   
   const { page } = req.query
   
    try {
        let [count] = await dbConnection.execute("SELECT COUNT(*) as count FROM tasks");
        let rows = await find({...pagination(page)})
     
     res.status(200).send({
        count: count[0].count,
        data: rows[0],
        currentPage: parseInt(page && page.number, 10) || 1,
        totalPage: totalPage(count[0].count, (page && page.size)),
        message: null,
        success: true
     })
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const findUserTasks = async (req, res) => {
   const {page} = req.query
       
    try {
      let [count] = await dbConnection.execute("SELECT COUNT(*) as count FROM tasks WHERE user_id=?",[req.decoded.id]);
      let rows = await getUserTasks({...pagination(page),currentUser:req.decoded})
     
     res.status(200).send({
        count: count[0].count,
        data: rows[0],
        currentPage: parseInt(page && page.number, 10) || 1,
        totalPage: totalPage(count[0].count, (page && page.size)),
        message: null,
        success: true
     })
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const updateTask = async (req, res) => {
   
    try {
     await update(req.body,req.params.id, req.decoded)
     const [rows,fields] = await get(req.params.id) 
     
     res.status(200).send({data: rows[0], message: null, success: true})
    
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const editTaskStatus = async (req, res) => {
    const {status} = req.body
    try {
     await updateStatus(status,req.params.id, req.decoded)
     const [rows,fields] = await get(req.params.id)
     
     res.status(200).send({data: rows[0], message: null, success: true})
    
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const deleteTask = async (req, res) => {
    
    try {
      await remove(req.params.id, req.decoded)
     res.status(202).send({data: null, message: 'Task Successfully deleted', success: true})
    
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }


module.exports = {
  createTask,
  getTask,
  getAllTasks,
  findUserTasks,
  updateTask,
  editTaskStatus,
  deleteTask
}
