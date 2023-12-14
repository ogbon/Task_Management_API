const { create,
        get,
        find,
        update,
        remove,
        updateStatus,
        getUserTasks,
        countTask
      } = require('../models/task')



const createTask = async (req, res) => {
   
   try {
    let task = await create(req.body, req.decoded)
    
    if(task[0].insertId){
       const [rows,fields] = await get(task[0].insertId)
       res.status(201).send({data: rows[0]})
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
     res.status(200).send({data: rows[0]})
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const getAllTasks = async (req, res) => {

    try {
        let [rows,fields] = await find()
     
     res.status(200).send({
        data: rows
     })
    }catch(err){
        console.log(err)
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const findUserTasks = async (req, res) => {
    
    try {
     let [rows,fields] = await getUserTasks(req.decoded)
     
     res.status(200).send({data: rows})
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const updateTask = async (req, res) => {
   
    try {
     let task = await update(req.body,req.params.id, req.decoded)
     res.status(200).send({data: task[0]})
    
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const editTaskStatus = async (req, res) => {
    const {status} = req.body
    try {
     let task = await updateStatus(status,req.params.id, req.decoded)
     res.status(200).send({data: task[0]})
    
    }catch(err){
     res.status(422).send({data: null, message: 'Unable to process your request', success: false}) 
    }
 
 }

 const deleteTask = async (req, res) => {
    
    try {
      await remove(req.params.id, req.decoded)
     res.status(200).send({data: null, message: 'Task Successfully deleted'})
    
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
