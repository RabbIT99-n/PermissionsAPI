# Naida test
***Permissions API 

Permissions API implements a set of JSON end-points which allow other parts of a larger application to update and test user access (permissions) over a set of named objects.

The API deals with:
- a set of Named OBJECTS whose access permissions are being controlled,
- a set of USERNAMES which might have different types of permissions.
- a set of GROUPS that those users may be part of,
- a set of PERMISSIONS which specific users or groups of users might have over specific objects.

*API documentation 

Complete API documentation (created with Postman) can be found on public URL: https://documenter.getpostman.com/view/9085921/SW14TwCX?version=latest

*Getting Started 

Instructions for running API on your local machine for develoment and testing purposes. 

*Prerequisited 

Pull project folder from GitLab to your local machine: https://gitlab.com/saburly/testovi/naida 

*Setting up database 

Install PostgreSQL from official site if needed: https://www.postgresql.org/download/ 

Navigate to project folder. Open terminal and run script for creating a database. Before runing script change user to postgres. 

$sudo su - postgres 

$chmod +x dbscript.sh
$sh dbscript.sh 

In file permissions.js change password for user postgres and local host if needed: 
        const db = knex ({
            client: 'pg',
            connection: {
            host : '127.0.0.1',
            user : 'postgres',
            password : '0904',
            database : 'testdb'
            }
        });

*Installing dependencies 

Check that package.json has listed dependencies: 
        "dependencies": {
        "body-parser": "^1.19.0",
        "cors": "^2.8.5",
        "express": "^4.17.1",
        "express-validator": "^6.2.0",
        "knex": "^0.20.0",
        "pg": "^7.12.1",
        "chai": "^4.1.2",
        "chai-http": "4.2.1",
        "mocha": "^5.2.0",
        "mochawesome": "^3.0.2",
        "supertest": "^3.1.0",
        "tv4": "^1.3.0"
        },
        "devDependencies": {
        "nodemon": "^1.19.4"
        }
In terminal navigate to project folder and run: 
$npm install

This should install all needed dependencies (node modules). 

*Start project 

To run API on your local machine open terminal, navigate to project folder and run: 
$npm start 

API is running on default localport 3000, for testing and development purposes. 

*Running the test

For conducting script test, run in terminal: 
$npm test

*Built With

 -Node.js, Express
 -PostgreSQL
 -Postman
 -Mocha

*Acknowledgments

Special thanks to authors of these excelent articles and repositories: 
-https://medium.com/@olotintemitope/how-to-generate-your-api-documentation-in-20-minutes-4e0072f08b94
-https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go 
-https://medium.com/@shashiraja/convert-postman-api-tests-to-mocha-10705af6e37a 
-https://medium.com/@svsh227/write-your-first-test-case-in-your-node-app-using-mocha-5250e614feb3 


