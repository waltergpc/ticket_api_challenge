const express = require('express')
const router = express.Router()
const { getTicketId, postNewTicket } = require('./api')
const { validateReceiptSchema } = require('../dto/validation')

router.route('/process').post(validateReceiptSchema, postNewTicket)

router.route('/:id/points').get(getTicketId)

module.exports = router
