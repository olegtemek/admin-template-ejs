import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser';
import engine from 'ejs-mate'

const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', engine)

app.use('/static', express.static('public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(express.json());

import adminRoutes from './admin/routes/index.js'
import adminAuth from './admin/middlewares/auth.js'

adminRoutes.forEach(route => {
  app.use('/', adminAuth, route)
})





app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
})