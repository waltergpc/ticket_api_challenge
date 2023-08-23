const crypto = require('crypto')

const countRetailerCharacters = (retailerString) => {
	//This function will count only letters and numbers for the retailer name
	const regex = /[a-zA-Z0-9]/g
	return retailerString.match(regex).length
}

const checkIfNumberIsRound = (totalAmount) => {
	//check if total is round number and assign 50 points if true
	result = totalAmount - Math.floor(totalAmount) == 0
	if (result) return 50
	return 0
}

const checkIfNumberIsMultipleOf25 = (totalAmount) => {
	//check if total is multiple of .25 and assign 25 points if true
	const isMultipleOf25 = totalAmount % 0.25 === 0
	if (isMultipleOf25) return 25
	return 0
}

const checkForEveryTwoItems = (itemsArray) => {
	//check for number of pairs and multiply each pair by five points
	let numberOfPairs = 0
	if (itemsArray.length >= 2) {
		numberOfPairs = Math.floor(itemsArray.length / 2)
	}
	return numberOfPairs * 5
}

const lookIfDateIsOdd = (purchaseDate) => {
	//check if date is odd number and add 6 points if number is odd, Joi validation is returning JS
	// Date timestamp
	let points = 0
	let date = purchaseDate.getUTCDate()
	if (date % 2 !== 0) {
		points = 6
	}
	return points
}

const checkIfTimeIsBetweenAcceptedTimes = (purchaseTime) => {
	let points = 0
	const timeNumbers = purchaseTime.split(':')
	if (Number(timeNumbers[0]) >= 14 && Number(timeNumbers[0]) < 16) {
		points = 10
		return points
	}
	if (timeNumbers[0] === 16 && timeNumbers[1] === '00') {
		points = 10
		return points
	}
	return points
}

const checkForItemDescription = (item) => {
	//check if the trimmed number of characters is multiple of 3 and if true multiply by 3 and round up to nearest integer
	const { shortDescription, price } = item
	let points = 0
	let trimmedDescription = shortDescription.trim()
	if (trimmedDescription.length % 3 === 0) {
		points = Math.ceil(price * 0.2)
	}

	return points
}

const processNewTicket = (ticket) => {
	const { retailer, purchaseDate, purchaseTime, items } = ticket
	let { total } = ticket

	total = Number(total)
	let totalPoints = 0
	//Add retailer character length points
	totalPoints = totalPoints + countRetailerCharacters(retailer)
	//Check if total is Round number and add points
	totalPoints = totalPoints + checkIfNumberIsRound(total)
	//Check if total is muktiple of .25
	totalPoints = totalPoints + checkIfNumberIsMultipleOf25(total)
	//check for every two items in the list
	totalPoints = totalPoints + checkForEveryTwoItems(items)
	//Check if purhcase date is odd number
	totalPoints = totalPoints + lookIfDateIsOdd(purchaseDate)
	//Check if TIme is between 14PM and 16PM
	totalPoints = totalPoints + checkIfTimeIsBetweenAcceptedTimes(purchaseTime)
	// Check single items for description, date and time
	items.forEach((item) => {
		totalPoints = totalPoints + checkForItemDescription(item)
	})

	let newId = crypto.randomUUID()

	return { totalPoints, id: newId }
}

module.exports = { processNewTicket }
