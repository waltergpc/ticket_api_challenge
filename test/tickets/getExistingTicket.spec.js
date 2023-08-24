let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../../app')
let should = chai.should()
const { testReceipt } = require('./testConsts')

chai.use(chaiHttp)

describe('/api/v1/receipts/:id/points endpoint', () => {
	/*
	 * Test the POST /api/v1/receipts/process
	 */
	describe('GET /api/v1/receipts/:id/points route test list', () => {
		describe('Tests for error cases', () => {
			it('Should throw 404 error on inital get with empty cache', (done) => {
				chai
					.request(app)
					.get('/api/v1/receipts/7fb1377b-b223-49d9-a31a-5a02701dd310/points')
					.end((err, res) => {
						res.should.have.status(404)
						res.body.should.have.property('msg')
						done()
					})
			})

			it('Should throw 400 providing an id route param that is not uuid or guid', (done) => {
				chai
					.request(app)
					.get('/api/v1/receipts/id1/points')
					.end((err, res) => {
						res.should.have.status(400)
						res.body.should.have.property('msg')
						res.body.msg.should.be.a('string')
						res.body.msg.should.equal(
							"Route parameters doesn't comply, id route param should be a valid GUID"
						)
						done()
					})
			})
		})

		describe('test for creating and getting existing id from cache', () => {
			it('Should succesfully process a ticket and retrieve the existing points and the next http request', async () => {
				let id
				const res = await chai
					.request(app)
					.post('/api/v1/receipts/process')
					.send(testReceipt)

				id = res.body.id

				chai
					.request(app)
					.get(`/api/v1/receipts/${id}/points`)
					.end((err, res) => {
						res.should.have.status(200)
						res.body.should.have.property('points')
						res.body.points.should.be.a('number')
						res.body.points.should.equal(109)
					})
			})
		})
	})
})
