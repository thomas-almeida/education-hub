import api from './route.js'

import { fileURLToPath } from 'url'
import path from 'path'
import express from 'express'
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(api)

//serve video files
app.use('/files', express.static(path.join(__dirname, '..', 'db', 'slides')))

app.listen(port, () => {
    console.log(`🎓 EDUCATION HUB ONLINE IN https://workable-sloth-strangely.ngrok-free.app`)
})