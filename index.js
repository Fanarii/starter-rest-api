import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import session from 'express-session'

import MenuRoutes from './routes/MenuRoutes.js'
import OrderRoutes from './routes/OrderRoutes.js'
import AuthRoutes from './routes/AuthRoutes.js'
import UserRoutes from './routes/UserRoutes.js'

const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.static('./public'))
app.use(fileUpload())

app.use(session({
    secret: 'idjwoaijdshdiwh2g382dywgduywtuywsyu',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: 'auto'}
}))

app.use(MenuRoutes)
app.use(OrderRoutes)
app.use(AuthRoutes)
app.use(UserRoutes)

app.listen(5000, () => {
    console.log('server up and running...')
})