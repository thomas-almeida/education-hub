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
        const { name, instructorId, descriprion, totalClasses } = req.body

        const data = fs.readFileSync(coursesDB, 'utf-8')
        courses = data ? JSON.parse(data) : []

        const courseId = generateIds.generateExtenseId(courses)

        const newCourse = {
            id: courseId,
            name,
            instructorId,
            descriprion,
            totalClasses,
            currentClass: 0,
            nextClass: Date.now(),
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

async function getCoursesPerTeacher(req, res) {
    try {

        let users = []
        let courses = []

                

    } catch (error) {
        console.error(error)
    }
}

export default {
    createCourse
}