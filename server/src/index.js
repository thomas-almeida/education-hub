import api from './route.js'

import express from 'express'
import cors from 'cors'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(api)

app.listen(port, () => {
    console.log(`🎓 EDUCATION HUB ONLIN IN http://localhost:${port}`)
})