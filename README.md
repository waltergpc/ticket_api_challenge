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

`npm start`
