import { Router } from "express"
import userController from '../controllers/userController.js'
import exercisesController from "../controllers/exercisesController.js"
import classController from "../controllers/classController.js"
import courseController from "../controllers/courseController.js"

const api = Router()

//User
api.post('/users/sign-up', userController.signUp)
api.post('/users/sign-in', userController.signIn)
api.get('/users/get-user-by-id/:id', userController.getUserById)

//exercise
api.post('/users/admin/create-exercise', exercisesController.uploadFile.single('file'), exercisesController.uploadExercise)
api.get('/exercises/get-exercise-by-id/:id', exercisesController.getExerciseById)
api.get('/exercises/get-exercises', exercisesController.getExercises)

//classes
api.post('/users/admin/create-class', classController.uploadFiles, classController.uploadClass)
api.get('/classes/get-class-by-id/:id', classController.getClassById)
api.get('/classes/get-classes-from-course/:id', classController.getClassesFromCourse)

//donwload 
api.get('/files/download/:filename', classController.downloadFile)

//courses
api.post('/users/admin/courses/create-course', courseController.createCourse)
api.get('/users/admin/courses/get-courses-by-instructor-id/:id', courseController.getCoursesByInstructorId)
api.get('/users/admin/courses/get-students-by-course-id/:id', courseController.getStudentsByCourseId)

export default api