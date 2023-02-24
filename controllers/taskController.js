const Task = require('../models/Task')
const { createTaskSchema } = require('../helpers/validationSchema')
const moment = require('moment')
const logger = require('../helpers/logger')

// Create Task
const createTask = async (req, res) => {
  const error_msg = []
  const params = req.body

  const { error } = createTaskSchema.validate(params, { abortEarly: false })

  if (error) {
    error.details.map((err) => error_msg.push(err.message))
    logger.error(error_msg)
    return res.status(404).json({ errors: error_msg })
  }

  // Check duplicate task
  const duplicate = await Task.findOne({
    user_id: req.authID,
    title: params.title,
  })
  if (duplicate) {
    error_msg.push(`"${duplicate.title}" is already on the task list`)
    return res.status(404).json({ errors: error_msg })
  }

  try {
    const data = {
      user_id: req.authID,
      title: params.title,
      description: params.description,
    }

    const task = new Task(data)
    await task.save()
    logger.info('task saved')
    res.status(201).json({ task })
  } catch (e) {
    console.log(e)
  }
}

// Update Task
const updateTask = async (req, res) => {
  console.log(req.body)

  const _id = req.params.id
  const error_msg = []
  const params = req.body

  const { error } = createTaskSchema.validate(params, { abortEarly: false })

  if (error) {
    error.details.map((err) => error_msg.push(err.message))
    logger.error(error_msg)
    return res.status(404).json({ errors: error_msg })
  }

  try {
    const newTask = await Task.findByIdAndUpdate(_id, params, { new: true })
    logger.info('Task Updated')
    res.status(200).json({ newTask })
  } catch (e) {
    logger.error(e)
  }
}

const getTasks = async (req, res) => {
  try {
    const _tasks = await Task.find({ user_id: req.authID }).sort({
      created_at: 'desc',
    })

    const tasks = _tasks.map((task) => {
      const newTask = {}
      newTask['_id'] = task._id
      newTask['completed'] = task.completed
      newTask['title'] = task.title
      newTask['description'] = task.description
      newTask['created_at'] = moment(task.created_at).format(`lll`)

      return newTask
    })

    res.status(200).json({ tasks })
  } catch (e) {
    logger.error(e)
  }
}

const deleteTask = async (req, res) => {
  const _id = req.params.id
  try {
    await Task.findByIdAndRemove(_id)
    logger.info('task deleted')
    res.json({ message: 'Task Deleted' })
  } catch (e) {
    logger.error(e)
    res.json({ error: e })
  }
}

module.exports = { createTask, getTasks, deleteTask, updateTask }
