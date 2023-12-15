const express = require('express')

const taskController = require('../controllers/taskController')
const isAuthenticated = require('../middleware/permission')

const tasks = express.Router()

tasks.route('/')
  .post(isAuthenticated, taskController.createTask)

tasks.route('/user')
  .get(isAuthenticated, taskController.findUserTasks)  

tasks.route('/:id')
  .get(isAuthenticated, taskController.getTask)

tasks.route('/')
  .get(isAuthenticated, taskController.getAllTasks)

tasks.route('/:id')
  .put(isAuthenticated, taskController.updateTask)  

tasks.route('/:id/status')
  .put(isAuthenticated, taskController.editTaskStatus)  

tasks.route('/:id')
  .delete(isAuthenticated, taskController.deleteTask)    
  

  
module.exports = tasks
