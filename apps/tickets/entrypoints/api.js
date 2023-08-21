const { StatusCodes } = require('http-status-codes')
const { processNewTicket } = require('../services/processNewTicket')

const ticketIdsMap = {}

const getTicketId = (req, res) => {
	return
}

const postNewTicket = (req, res) => {
	const ticket = req.body
	const ticketIdWithPoints = processNewTicket(ticket)
	ticketIdsMap[ticketIdWithPoints.id] = ticketIdWithPoints.totalPoints
	console.log(ticketIdsMap)
	res.status(StatusCodes.OK).json(ticketIdWithPoints)
}

module.exports = { getTicketId, postNewTicket }
