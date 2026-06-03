import cors from 'cors'
import express from 'express'
import { corsOptions } from './config/cors.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js'
import apiRoutes from './routes/index.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app
