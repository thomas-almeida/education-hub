import { Router } from "express"
import userController from '../controllers/userController.js'
import exercisesController from "../controllers/exercisesController.js"
import classController from "../controllers/classController.js"

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
api.post('/users/admin/create-class', classController.uploadFile, classController.uploadClass)
api.get('/classes/get-class-by-id/:id', classController.getClassById)
api.get('/classes/get-classes', classController.getClasses)

//donwload 
api.get('/files/download/:filename', classController.downloadFile)
 
export default api