const express = require('express')
const router = express.Router()
const { getTicketId, postNewTicket } = require('./api')
const {
	validateReceiptSchema,
	validateRouteParams
} = require('../dto/validation')

router.route('/process').post(validateReceiptSchema, postNewTicket)

router.route('/:id/points').get(validateRouteParams, getTicketId)

module.exports = router
