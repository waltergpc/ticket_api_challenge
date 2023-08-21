require('dotenv').config()
require('express-async-errors')
// express
const express = require('express')
const app = express()
// packages
const morgan = require('morgan')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const port = process.env.PORT || 5000

app.set('trust proxy', 1)
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 60
	})
)

app.use(cors())
app.use(helmet())
app.use(xss())
app.use(morgan('tiny'))
app.use(express.json())

//routers

const ticketRouter = require('./apps/tickets/entrypoints/routes')

app.get('/', (req, res) => {
	res.status(200).json({ response: 'OK' })
})

app.use('/api/v1/receipts', ticketRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`App is listening on port ${port}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
