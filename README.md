<!-- prettier-ignore -->
# DEVinHouse Project II - LabCar

This project is the third big challenge from DEVinHouse course in collaboration with the company Intelbras, where the proposition was to create a CRUD-like REST API using NEST.JS to manage an UBER-like application.

<img src="https://iili.io/pYli1S.png"></img>

## Getting Started

To install the dependencies you need to run **npm or yarn** command:

```
$ npm install

$ yarn install

```

## Commands

In the project directory you can run:

### **npm run start:dev**

Runs the application in development mode. Which will run at: http://localhost:3000

#### Swagger

```
Access swagger's API documentation at http://localhost:3000/api

```

## Configs

To run the project, it is necessary to create the .env file in the project root, and add your google API key

```
API_KEY='your-api-key'

```

## Endpoints

### Drivers

```

POST
/drivers
Creates a new Driver

GET
/drivers
Lists all drivers, with optional pagination and name query

GET
/drivers/{cpf}
Lists driver details

PUT
/drivers/{cpf}
Updates driver

DELETE
/drivers/{cpf}
Deletes a driver, if he is inactive (0 trips taken)

PATCH
/drivers/block/{cpf}
Changes driver.blocked to true of false

```

### Trips

```

POST
/trips/new/{passengerCPF}
Creates new trip

POST
/trips/nearby/{driverCPF}
Lists trips nearby driver

GET
/trips
Lists all trips

GET
/trips/pending
Lists all trips with status = created

GET
/trips/{id}
Lists trip details

PUT
/trips/{id}
Updates a trip

DELETE
/trips/{id}
Deletes a trip


```

### Passengers

```

POST
/passengers
Creates a new Passenger

GET
/passengers
Lists all passengers, with optional pagination and name query

GET
/passengers/{cpf}
Lists passenger details

PUT
/passengers/{cpf}
Updates passenger

DELETE
/passengers/{cpf}
Deletes a passenger

PATCH
/passengers/block/{cpf}
Changes passenger.blocked to true of false

```
