import generateIds from '../utils/generateIds.js'

import fs from 'fs'
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const coursesDB = path.join(__dirname, '..', 'db', 'courses.json')
const usersDB = path.join(__dirname, '..', 'db', 'users.json')

async function createCourse(req, res) {
    try {

        let courses = []
        const { name, instructorId, description, totalClasses } = req.body

        const data = fs.readFileSync(coursesDB, 'utf-8')
        courses = data ? JSON.parse(data) : []

        const courseId = generateIds.generateExtenseId(courses)

        const newCourse = {
            id: courseId,
            name,
            instructorId,
            description,
            totalClasses,
            currentClass: 0,
            nextClass: Date.now(),
            icon: "",
            exercises: []
        }

        courses.push(newCourse)
        fs.writeFileSync(coursesDB, JSON.stringify(courses, null, 2))
        console.log(`instructor [${instructorId}] created a new course ${name}`)

        res.status(200).json({
            message: 'success',
            course: newCourse
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'internal server error'
        })
    }
}

async function getCoursesByInstructorId(req, res) {
    try {

        let courses = []
        let courseByInstructorId = []

        const id = req.params.id
        const coursesData = fs.readFileSync(coursesDB, 'utf-8')

        courses = coursesData ? JSON.parse(coursesData) : []

        courses.forEach((course) => {
            if (course?.instructorId === id) {
                courseByInstructorId.push(course)
            }
        })

        res.status(200).json({
            message: 'success',
            courses: courseByInstructorId
        })

    } catch (error) {
        console.error(error)
    }
}

async function getCoursesByStudentId(req, res) {
    try {

        let courses = []
        let courseByStudentId = []

        const id = req.params.id
        const coursesData = fs.readFileSync(coursesDB, 'utf-8')

        courses = coursesData ? JSON.parse(coursesData) : []

        courses.forEach((course) => {
            if (course?.id === id) {
                courseByStudentId.push(course)
            }
        })

        res.status(200).json({
            message: 'success',
            courses: courseByStudentId
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'internal server error'
        })
    }
}

async function getStudentsByCourseId(req, res) {
    try {

        let users = []
        let usersByCourseId = []

        const id = req.params.id
        const usersData = fs.readFileSync(usersDB, 'utf-8')

        users = usersData ? JSON.parse(usersData) : []

        users.forEach((user) => {
            if (user?.role === 'STUDENT' && user?.courseId === id) {
                usersByCourseId.push(user)
            }
        })

        res.status(200).json({
            mesasge: 'success',
            users: usersByCourseId
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'internal server error'
        })
    }
}

export default {
    createCourse,
    getCoursesByInstructorId,
    getCoursesByStudentId,
    getStudentsByCourseId
}