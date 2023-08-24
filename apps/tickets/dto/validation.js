const Joi = require('joi')
const JoiDate = require('joi').extend(require('@joi/date'))
const { BadRequestError } = require('../../../errors')

const validateReceiptSchema = (req, res, next) => {
	// create schema object
	const schema = Joi.object({
		retailer: Joi.string().required(),
		purchaseDate: JoiDate.date().format('YYYY-MM-DD').required(),
		purchaseTime: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
		items: Joi.array()
			.min(1)
			.items(
				Joi.object({
					shortDescription: Joi.string().required(),
					price: Joi.string()
						.required()
						.pattern(/^[0-9]*\.[0-9]{2}$/)
				})
			)
			.required(),
		total: Joi.string()
			.required()
			.pattern(/^[0-9]*\.[0-9]{2}$/)
	})

	// schema options
	const options = {
		abortEarly: false, // include all errors
		allowUnknown: true, // ignore unknown props
		stripUnknown: true // remove unknown props
	}

	// validate request body against schema
	const { error, value } = schema.validate(req.body)

	if (error) {
		let addedMessage = ''
		if (
			error.details &&
			Array.isArray(error.details) &&
			error.details.length > 0
		) {
			addedMessage = error.details[0].message
			if (error.details[0].message.includes('/^[0-9]*\\.[0-9]{2}$/')) {
				addedMessage =
					'price and total values should be a round number followed by two decimals'
			} else if (
				error.details[0].message.includes('/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/')
			) {
				addedMessage =
					'purchaseTime value should follow a valid HH:MM in 24 hour format'
			}
		}
		// on fail return comma separated errors
		throw new BadRequestError(`Request body doesn't comply, ${addedMessage}`)
	} else {
		// on success replace req.body with validated value and trigger next middleware function
		req.body = value
		next()
	}
}

const validateRouteParams = (req, res, next) => {
	const schema = Joi.string().required().guid()
	const { id } = req.params

	const { error } = schema.validate(id)

	if (error) {
		let addedMessage = ''
		if (
			error.details &&
			Array.isArray(error.details) &&
			error.details.length > 0
		) {
			addedMessage = error.details[0].message
			if (error.details[0].message.includes('"value" must be a valid GUID')) {
				addedMessage = 'id route param should be a valid GUID'
			}
		}
		// on fail return comma separated errors
		throw new BadRequestError(
			`Route parameters doesn't comply, ${addedMessage}`
		)
	} else {
		next()
	}
}

module.exports = { validateReceiptSchema, validateRouteParams }
