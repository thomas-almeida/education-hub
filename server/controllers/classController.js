import generateId from '../utils/generateIds.js'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const classesDb = path.join(__dirname, '..', 'db', 'classes.json')
const slidesDir = path.join(__dirname, '..', 'db', 'slides')
const coursesDb = path.join(__dirname, '..', 'db', 'courses.json')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, slidesDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const uploadFiles = multer({ storage }).array('files', 10)

if (!fs.existsSync(slidesDir)) {
  fs.mkdirSync(slidesDir, { recursive: true })
}

async function uploadClass(req, res) {

  let classes = []
  let courses = []

  try {
    const { id, courseId, name, description, schedule, videoUrl } = req.body

    if (!req.files || req.files.length === 0) {
      return res.status(401).send('nenhum arquivo enviado..')
    }

    if (fs.existsSync(classesDb)) {
      const data = fs.readFileSync(classesDb, 'utf-8')
      classes = data ? JSON.parse(data) : []
    }

    if (fs.existsSync(coursesDb)) {
      const coursesData = fs.readFileSync(coursesDb, 'utf-8')
      courses = coursesData ? JSON.parse(coursesData) : []
    }

    // Mapear os arquivos carregados
    const attachments = req.files.map(file => ({
      filename: file.filename,
      path: file.path.replace(/\\/g, '/'),
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    }))

    let existingClassIndex = classes.findIndex(selectedClass => selectedClass.id === id)

    if (existingClassIndex !== -1) {
      // Editar aula existente
      classes[existingClassIndex] = {
        ...classes[existingClassIndex],
        name,
        description,
        schedule,
        attachments: attachments.length > 0 ? attachments : classes[existingClassIndex].attachments,
      }
      console.log(`Class [${id}] has been updated`)
    } else {
      // Criar nova aula
      const classId = generateId.generateExtenseId(classes)
      const newClass = {
        id: classId,
        courseId,
        name,
        description,
        createdAt: Date.now(),
        schedule,
        attachments,
        videoUrl,
        exercise: {},
        presenceList: {
          frequency: 0,
          students: [],
        },
      }

      //adicionar +1 ao numero de aulas do curso
      courses.forEach((courseItem) => {
        if (courseItem.id === courseId) {
          courseItem.currentClass++
        }
      })

      classes.push(newClass)
      console.log(`Class [${classId}]${name} has been created for ${schedule}`)
    }

    fs.writeFileSync(classesDb, JSON.stringify(classes, null, 2))
    fs.writeFileSync(coursesDb, JSON.stringify(courses, null, 2))

    return res.status(201).json({
      message: 'success',
      class: classes[existingClassIndex] || classes[classes.length - 1],
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'internal server error',
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

async function getClassesFromCourse(req, res) {

  const id = req.params.id

  let classes = []
  let classesFromCourse = []

  try {

    const data = fs.readFileSync(classesDb, 'utf-8')
    classes = data ? JSON.parse(data) : []

    classes.forEach((classItem) => {
      if (classItem.courseId === id) {
        classesFromCourse.push(classItem)
      }
    })

    return res.status(200).json({
      message: 'success',
      classes: classesFromCourse
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
  uploadFiles,
  uploadClass,
  getClassById,
  getClassesFromCourse,
  downloadFile
}