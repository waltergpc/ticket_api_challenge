let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../../app')
let should = chai.should()
const {
	testReceipt,
	testReceipt2,
	testReceipt3,
	testReceiptWithWrongDateFormat,
	testReceiptWithWrongTime,
	testReceiptWithWrongItemPrice
} = require('./testConsts')

chai.use(chaiHttp)

describe('/api/v1/receipts/process endpoint', () => {
	/*
	 * Test the POST /api/v1/receipts/process
	 */
	describe('POST /api/v1/receipts/process route test list', () => {
		it('should successfully post, process a valid ticket and recieve an id with points for response', (done) => {
			chai
				.request(app)
				.post('/api/v1/receipts/process')
				.send(testReceipt)
				.end((err, res) => {
					res.should.have.status(201)
					res.body.should.have.property('id')
					res.body.id.should.be.a('string')
					done()
				})
		})
		it('should successfully post 2 tickets with same information but with one item trimmed differently and return th same points', async () => {
			const response1 = await chai
				.request(app)
				.post('/api/v1/receipts/process')
				.send(testReceipt2)

			const response2 = await chai
				.request(app)
				.post('/api/v1/receipts/process')
				.send(testReceipt3)

			const id1 = response1.body.id
			const id2 = response2.body.id

			const firstResPoints = await chai
				.request(app)
				.get(`/api/v1/receipts/${id1}/points`)
			const secondResPoints = await chai
				.request(app)
				.get(`/api/v1/receipts/${id2}/points`)

			firstResPoints.body.should.have.property('points')
			secondResPoints.body.should.have.property('points')

			firstResPoints.body.points.should.equal(secondResPoints.body.points)
		})
	})

	describe('POST /api/v1/receipts/process route  error test list', () => {
		it('Should throw a 400 error trying to process a ticket with wrong date format', (done) => {
			chai
				.request(app)
				.post('/api/v1/receipts/process')
				.send(testReceiptWithWrongDateFormat)
				.end((err, res) => {
					res.should.have.status(400)
					res.body.should.have.property('msg')
					res.body.msg.should.equal(
						'Request body doesn\'t comply, "purchaseDate" must be in YYYY-MM-DD format'
					)
					done()
				})
		})
		it('Should throw a 400 error trying to process a ticket with wrong time', (done) => {
			chai
				.request(app)
				.post('/api/v1/receipts/process')
				.send(testReceiptWithWrongTime)
				.end((err, res) => {
					res.should.have.status(400)
					res.body.should.have.property('msg')
					res.body.msg.should.equal(
						"Request body doesn't comply, purchaseTime value should follow a valid HH:MM in 24 hour format"
					)
					done()
				})
		})
		it('Should throw a 400 error trying to process an item with no decimals', (done) => {
			chai
				.request(app)
				.post('/api/v1/receipts/process')
				.send(testReceiptWithWrongItemPrice)
				.end((err, res) => {
					res.should.have.status(400)
					res.body.should.have.property('msg')
					res.body.msg.should.equal(
						"Request body doesn't comply, price and total values should be a round number followed by two decimals"
					)
					done()
				})
		})
	})
})
