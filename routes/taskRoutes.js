const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const { auth, checkUser } = require('../middlewares/auth')

router.get('*', checkUser)

// api
router.get('/get-tasks', auth, taskController.getTasks)
router.post('/create-task', auth, taskController.createTask)
router.put('/update-task/:id', auth, taskController.updateTask)
router.delete('/delete-task/:id', auth, taskController.deleteTask)

module.exports = router
