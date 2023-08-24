# Ticket Processor Challenge

This repo will deploy thew ticket processor challenge for the fetch backend position.
This app was developed using Node JS and express JS. In order to run this repository you
can do it through the docker image or directly using node JS

## .env file

Set up a .env file the the variables specified in the .env.example file, in case port variable is
changed, make sure to adjust the -p flag int the docker commands, try to follow ports documented
in the dockerfile and the example.env

## Docker Setup

Docker installation is needed to proceed. In case you do not hace Docker please refer to
[Docker](https://www.docker.com) website and follow the instructins for your OS.

- After installation run the command:

`docker build -t rprocessor .`

- Then run:

`docker run -p 5000:5000 rprocessor`

This should start the app in port 5000 with the 2 endpoints specified.

## Run repor using NVM and Node JS

If you want to run this app using node JS, it is recommended to use NVM to adhere to the version of Node
used for development. In case you do not have NVM please refer to their [repository](https://github.com/nvm-sh/nvm) and follow
the instructions.

- After installation of NVM, once in the project folder run the command:

`nvm use 16.2.0`

- Then run the command:

`npm i && npm start`

### Endpoints

First endpoint will be a POST with a route of `api/v1/receipts/process`, this endpoint will process
a json payload provided in the body with a schema as following:

`{
  "retailer": string,
  "purchaseDate": string, format should be YYYY-MM-DD,
    "purchaseTime": string, format should be HH:MM,
    "total": string, format should be interger followed by two decimals,
    "items": [
        {"shortDescription": string, string, format should be interger followed by two decimals},
    ]
}`

Second endpoint will be a GET request with path `receipts/{id}/points`, where the {id} needs to be a required string
with uuid format

### Testing

In order to run tests locally, node and npm should be installed, please refer to the upper part of the documentation
to install.

Once installed, install and run repository locally using npm commands as stated above, once accomplished, you
can run the next command to run tests:

`npm run test`
