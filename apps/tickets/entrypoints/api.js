const { StatusCodes } = require('http-status-codes')
const { processNewTicket } = require('../services/processNewTicket')
const { getExistingTicketPoints } = require('../services/getExistingTicket')
const { BadRequestError, NotFoundError } = require('../../../errors')

const ticketIdsMap = {}

const getTicketId = (req, res) => {
	const { id } = req.params
	if (!id) {
		throw new BadRequestError('No id was given for search')
	}
	const points = getExistingTicketPoints(ticketIdsMap, id)

	if (!points) {
		throw new NotFoundError('No receipt found for that id')
	}

	res.status(StatusCodes.OK).json({ points })
}

const postNewTicket = (req, res) => {
	const ticket = req.body
	const ticketIdWithPoints = processNewTicket(ticket)
	ticketIdsMap[ticketIdWithPoints.id] = ticketIdWithPoints.totalPoints
	res.status(StatusCodes.CREATED).json({ id: ticketIdWithPoints.id })
}

module.exports = { getTicketId, postNewTicket }
