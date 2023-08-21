const express = require('express')
const router = express.Router()
const { getTicketId, postNewTicket } = require('./api')

router.route('/process').post(postNewTicket)

router.route('/:id/points').get(getTicketId)

module.exports = router
