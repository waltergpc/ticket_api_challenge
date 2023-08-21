const { StatusCodes } = require('http-status-codes')
const { processNewTicket } = require('../services/processNewTicket')
const { getExistingTicketPoints } = require('../services/getExistingTicket')

const ticketIdsMap = {}

const getTicketId = (req, res) => {
	const { id } = req.params
	const points = getExistingTicketPoints(ticketIdsMap, id)

	res.status(StatusCodes.OK).json({ points })
}

const postNewTicket = (req, res) => {
	const ticket = req.body
	const ticketIdWithPoints = processNewTicket(ticket)
	ticketIdsMap[ticketIdWithPoints.id] = ticketIdWithPoints.totalPoints
	res.status(StatusCodes.OK).json({ id: ticketIdWithPoints.id })
}

module.exports = { getTicketId, postNewTicket }
