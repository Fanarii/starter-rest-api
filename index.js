import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import MenuRoutes from './routes/MenuRoutes.js'

const app = express()

app.use(cors({credentials: 'ture', origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.static('./public'))
app.use(fileUpload())

app.use(MenuRoutes)

app.listen(5000, () => {
    console.log('server up and running...')
})