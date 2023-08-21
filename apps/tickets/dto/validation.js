const Joi = require('joi')
const { BadRequestError } = require('../../../errors')

const validateReceiptSchema = (req, res, next) => {
	// create schema object
	const schema = Joi.object({
		retailer: Joi.string().required(),
		purchaseDate: Joi.string().required(),
		purchaseTime: Joi.string().required(),
		items: Joi.array()
			.min(1)
			.items(
				Joi.object({
					shortDescription: Joi.string().required(),
					price: Joi.string().required()
				})
			)
			.required(),
		total: Joi.string().required()
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
	const schema = Joi.string().required()
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
