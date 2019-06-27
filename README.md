[![Build Status](https://travis-ci.org/phemmz/pms-api.svg?branch=master)](https://travis-ci.org/phemmz/pms-api)

# pms
Population Management System Application API

## Development
This application was developed using Node, Express, Sequelize and Postgres.

## Installation
1. Start up your terminal (or Command Prompt on Windows OS).
2. Ensure that you have node installed on your PC.
3. Clone the repository by entering the command in your terminal:
  ```git clone https://github.com/phemmz/pms-api.git```
4. Navigate to the project root folder using cd pms-api on your terminal (or command prompt).
5. After cloning, install the application's dependencies with the command `yarn install`.
6. Run `yarn start` to start the app in development mode.<br>

## Key Features
### Location
- Users can create a location
- Users can get all locations
- Users can update an existing location
- Users can delete a particular location

## API
### POST `/api/v1/location`
#### Body
```
{
  "name": "Germany",
  "female": 30000000
  "male": 20000000,
  "parentLocationId"?: 1
}
```

#### Response
201:
```
{
  "success": true,
  "message": "Location created successfully",
  "location": {
    "id": 1,
    "name": "Germany",
    "female": 30000000,
    "male": 20000000,
    "parentLocationId": null,
    "updatedAt": "2019-06-27T05:00:57.849Z",
    "createdAt": "2019-06-27T05:00:57.849Z"
  }
}
```

422:
```
{
  "success": false,
  "errors": {
    "name": "Location name field can not be empty",
    "female": "Female field can not be empty",
    "male": "Male field can not be empty"
  }
}
```

404:
```
{
  "success": false,
  "message": "Parent location id not found",
}
```

500:
```
{
  "success": false,
  "error": "Server failed, please try again!"
}
```

### GET `/api/v1/locations`
#### Response
200:
```
{
  "success": true,
  "message": "Locations retrieved successfully",
  "locations": [
    {
      "id": 1,
      "name": "Germany",
      "female": 30000000,
      "male": 20000000,
      "parentLocationId": null,
      "updatedAt": "2019-06-27T05:00:57.849Z",
      "createdAt": "2019-06-27T05:00:57.849Z",
      "nestedLocations": []
    }
  ]
}
```

200:
```
{
  "success": true,
  "message": "No location found",
  "locations": []
}
```

500:
```
{
  "success": false,
  "error": "Server failed, please try again!"
}
```

### PATCH `/api/v1/locations/:locationId`
params - locationId

#### Body
```
{
  "name": "Germany-1",
  "female": 30000001
  "male": 20000001,
}
```

#### Response
200:
```
{
  "success": true,
  "message": "Location updated successfully",
  "updatedLocation": {
    "id": 1,
    "name": "Germany-1",
    "female": 30000001,
    "male": 20000001,
    "parentLocationId": null,
    "updatedAt": "2019-06-27T05:00:57.849Z",
    "createdAt": "2019-06-27T05:00:57.849Z"
  }
}
```

404:
```
{
  "success": false,
  "message": "Location not found"
}
```

422:
```
{
  "success": false,
  "errors": {
    "name": "Location name field can not be empty",
    "female": "Female field can not be empty",
    "male": "Male field can not be empty"
  }
}
```

500:
```
{
  "success": false,
  "error": "Server failed, please try again!"
}
```

### DELETE `/api/v1/locations/:locationId`
param - locationId

#### Response
200:
```
{
  "success": true,
  "message": "Location successfully deleted!"
}
```

404:
```
{
  "success": false,
  "message": "Location not found"
}
```

500:
```
{
  "success": false,
  "error": "Server failed, please try again!"
}
```

## How To Contribute
- Fork this repository
- Clone the repository
- Create your feature branch locally with ``` git checkout -b your-feature-branch-name ```
- Commit your changes using ``` git commit -m 'Commit name' ```
- Push your changes to your remote branch with ``` git push -u origin your-feature-branch-name ```
- Open a pull request to the develop branch, and describe how your feature works

## License
The MIT License

#### Author: Adetunji Femi

