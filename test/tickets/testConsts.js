const testReceipt = {
	retailer: 'M&M Corner Market',
	purchaseDate: '2022-03-20',
	purchaseTime: '14:33',
	items: [
		{
			shortDescription: 'Gatorade',
			price: '2.25'
		},
		{
			shortDescription: 'Gatorade',
			price: '2.25'
		},
		{
			shortDescription: 'Gatorade',
			price: '2.25'
		},
		{
			shortDescription: 'Gatorade',
			price: '2.25'
		}
	],
	total: '9.00'
}

const testReceipt2 = {
	retailer: 'Target',
	purchaseDate: '2022-01-01',
	purchaseTime: '13:01',
	items: [
		{
			shortDescription: 'Mountain Dew 12PK',
			price: '6.49'
		},
		{
			shortDescription: 'Emils Cheese Pizza',
			price: '12.25'
		},
		{
			shortDescription: 'Knorr Creamy Chicken',
			price: '1.26'
		},
		{
			shortDescription: 'Doritos Nacho Cheese',
			price: '3.35'
		},
		{
			shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
			price: '12.00'
		}
	],
	total: '35.35'
}

const testReceipt3 = {
	retailer: 'Target',
	purchaseDate: '2022-01-01',
	purchaseTime: '13:01',
	items: [
		{
			shortDescription: 'Mountain Dew 12PK',
			price: '6.49'
		},
		{
			shortDescription: 'Emils Cheese Pizza',
			price: '12.25'
		},
		{
			shortDescription: 'Knorr Creamy Chicken',
			price: '1.26'
		},
		{
			shortDescription: 'Doritos Nacho Cheese',
			price: '3.35'
		},
		{
			shortDescription: 'Klarbrunn 12-PK 12 FL OZ',
			price: '12.00'
		}
	],
	total: '35.35'
}

const testReceiptWithWrongDateFormat = {
	retailer: 'Target',
	purchaseDate: '2022-20-01',
	purchaseTime: '13:01',
	items: [
		{
			shortDescription: 'Mountain Dew 12PK',
			price: '6.49'
		}
	],
	total: '35.35'
}
const testReceiptWithWrongTime = {
	retailer: 'Target',
	purchaseDate: '2022-02-01',
	purchaseTime: '24:01',
	items: [
		{
			shortDescription: 'Mountain Dew 12PK',
			price: '6.49'
		}
	],
	total: '35.35'
}
const testReceiptWithWrongItemPrice = {
	retailer: 'Target',
	purchaseDate: '2022-01-01',
	purchaseTime: '23:01',
	items: [
		{
			shortDescription: 'Mountain Dew 12PK',
			price: '6'
		}
	],
	total: '35.35'
}

module.exports = {
	testReceipt,
	testReceipt2,
	testReceipt3,
	testReceiptWithWrongDateFormat,
	testReceiptWithWrongTime,
	testReceiptWithWrongItemPrice
}
