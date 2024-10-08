import generateId from '../utils/generateIds.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
//const usersDb = path.join(__dirname, '..', 'db', 'users.json')
const exercisesDb = path.join(__dirname, '..', 'db', 'exercises.json')
const sheetsDir = path.join(__dirname, '..', 'db', 'slides')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, sheetsDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const uploadFile = multer({ storage: storage })

if (!fs.existsSync(sheetsDir)) {
  fs.mkdirSync(sheetsDir, { recursive: true })
}

async function uploadExercise(req, res) {

  let exercises = []

  try {
    const { name, description } = req.body

    if (!req.file) {
      res.status(401).send('nenhum arquivo enviado..')
      return
    }

    if (fs.existsSync(exercisesDb)) {
      const data = fs.readFileSync(exercisesDb, 'utf-8')
      exercises = data ? JSON.parse(data) : []
    }

    const exerciseId = generateId.generateExtenseId(exercises)

    const newExercise = {
      id: exerciseId,
      name,
      description,
      createdAt: Date.now(),
      attachment: {
        filename: req.file.filename,
        path: req.file.path,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
      solutioners: []
    }

    exercises.push(newExercise)

    fs.writeFileSync(exercisesDb, JSON.stringify(exercises, null, 2))
    console.log(`Exercise [${exerciseId}]${name} has been created in ${Date.now()}`)
    return res.status(201).json({
      message: 'success',
      exercise: newExercise
    })

  } catch (error) {

    console.error(error)
    res.status(500).json({
      message: 'internal server error'
    })

  }

}

async function getExerciseById(req, res) {

  let exercises = []

  try {

    const id = req.params.id

    const data = fs.readFileSync(exercisesDb, 'utf-8')
    exercises = data ? JSON.parse(data) : []

    const exerciseExist = exercises.some(selectedExercise => selectedExercise.id === id)

    if (!exerciseExist) {
      res.status(401).json({ message: 'class not found' })
    }

    const foundedExercise = exercises.find(selectedExercise => selectedExercise.id === id)

    return res.status(200).json({
      message: 'success',
      class: foundedExercise
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'internal server error'
    })
  }
}

async function getExercises(req, res) {

  let exercises = []

  try {

    const data = fs.readFileSync(exercisesDb, 'utf-8')
    exercises = data ? JSON.parse(data) : []

    return res.status(200).json({
      message: 'success',
      exercises: exercises
    })

  } catch (error) {
    console.error(error)
  }

}

export default {
  uploadFile,
  uploadExercise,
  getExerciseById,
  getExercises,
}