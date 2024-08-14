import generateId from '../utils/generateIds.js'

import fs, { cpSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
//const usersDb = path.join(__dirname, '..', 'db', 'users.json')
const classesDb = path.join(__dirname, '..', 'db', 'classes.json')
const sheetsDir = path.join(__dirname, '..', 'db', 'sheets')
const slidesDir = path.join(__dirname, '..', 'db', 'slides')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, slidesDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const uploadFile = multer({ storage: storage }).array('files', 10)

if (!fs.existsSync(slidesDir)) {
  fs.mkdirSync(slidesDir, { recursive: true })
}

async function uploadClass(req, res) {

  let classes = []

  try {
    const { name, description, videoUrl, schedule } = req.body

    if (!req.files || req.files.length === 0) {
      return res.status(401).send('nenhum arquivo enviado..')
    }

    if (fs.existsSync(classesDb)) {
      const data = fs.readFileSync(classesDb, 'utf-8')
      classes = data ? JSON.parse(data) : []
    }

    const attachments = req.files.map(file => ({
      filename: file.filename,
      path: file.path.replace(/\\/g, '/'),
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    }))

    //const classPath = req.file.path.replace(/\\/g, '/')
    const classId = generateId.generateExtenseId(classes)

    const newClass = {
      id: classId,
      name,
      description,
      createdAt: Date.now(),
      schedule,
      videoUrl,
      attachments,
      exercise: {},
      presenceList: {
        frequency: 0,
        students: []
      }
    }

    classes.push(newClass)

    fs.writeFileSync(classesDb, JSON.stringify(classes, null, 2))
    console.log(`Class [${classId}]${name} has been created for ${schedule}`)
    return res.status(201).json({
      message: 'success',
      class: newClass
    })

  } catch (error) {

    console.error(error)
    res.status(500).json({
      message: 'internal server error'
    })

  }

}

async function getClassById(req, res) {

  let classes = []

  try {

    const id = req.params.id

    const data = fs.readFileSync(classesDb, 'utf-8')
    classes = data ? JSON.parse(data) : []

    const classExist = classes.some(selectedClass => selectedClass.id === id)

    if (!classExist) {
      res.status(401).json({ message: 'class not found' })
    }

    const foundedClass = classes.find(selectedClass => selectedClass.id === id)

    return res.status(200).json({
      message: 'success',
      class: foundedClass
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'internal server error'
    })
  }
}

async function getClasses(req, res) {

  let classes = []

  try {

    const data = fs.readFileSync(classesDb, 'utf-8')
    classes = data ? JSON.parse(data) : []

    return res.status(200).json({
      message: 'success',
      classes: classes
    })

  } catch (error) {
    console.error(error)
  }

}

async function downloadFile(req, res) {
  
  const { filename } = req.params
  const filePath = path.join(__dirname, '..', 'db', 'slides', filename)

  res.download(filePath, (err) => {
    if (err) {
      console.error(err)
      res.status(404).json({
        message: 'arquivo nao encontrado'
      })
    }
  })

}

export default {
  uploadFile,
  uploadClass,
  getClassById,
  getClasses,
  downloadFile
}