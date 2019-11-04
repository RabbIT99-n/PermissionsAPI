//Main API for managing user permissions database
const express=require('express');
const cors= require('cors');
const bodyParser= require('body-parser');
const knex= require ('knex');

const app=express();
//Enabling CORS
app.use(cors());
//Enabling req body parsing
app.use(bodyParser.json());
//Connection with database -locally
const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '0904',
      database : 'testdb'
    }
});

//Requiremenst for JSON endpoint calls
const addusertogroup= require('./endpoints/addusertogroup');
const cleargroup= require('./endpoints/cleargroup');
const addpermission= require('./endpoints/addpermission');
const clearpermissions= require('./endpoints/clearpermissions');
const testuserperm= require('./endpoints/testuserperm');
const querypermiss= require('./endpoints/querypermiss');
//Requiremenst for input data validation
const { addUserValidationRules, addPermissionValidationRules, validate, } = require('./validators/validator')

//Checking basics
app.get('/', (req, res) => {
     res.send("Work in progress...");
})

//Call for adding a user to a group
app.post('/addusertogroup', addUserValidationRules(), validate, (req, res) => {
    addusertogroup.handleAddUserToGroup(req, res, db)});

//Call for clearing all users from group
app.post('/cleargroup', (req,res) => {
    cleargroup.handleClearGroup(req, res, db);
});

//Call for adding a permission to a user or group
app.post('/addpermission', addPermissionValidationRules(), validate, (req, res) => {
    addpermission.handleAddPermission(req, res, db)});

//Call for clearing all permissions from user or group
app.post('/clearpermissions', (req,res) => {
    clearpermissions.handleClearPerm(req, res, db);
});

//Call for testing if a particular user has a particular permission over a
// particular object
app.post('/testuserperm', (req,res) => {
    testuserperm.condTest(req, res, db);
})

//Call for querying what permissions a particular user has over a particular object
app.post('/querypermiss', (req,res) => {
    querypermiss.handleQuery(req,res,db);
})

//Listening on local port 3000 -temporary, to be changed to env Var
app.listen(3000, () => {
    console.log(`App is running on port 3000`);
})

//For testing purpose
//module.exports = app; 