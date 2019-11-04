//TEST - Case from assignement. It is assumed that it is first to be run after database creation. 

//Requirements for testing purpose
const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha');
const tv4 = require('tv4');

//Data for testing  
const test1_data = [
    {
        "reqgroup": "administrators",
        "requser": "Bob"
        },
    {
        "reqgroup": "administrators",
	    "requser": "alice"
        },
];
const test2_data = [
    {
        "reqowner": "dan",
        "reqownertype": "user",
        "reqobjname" : "message of the day",
        "reqtype" : "view"
    },
    {
        "reqowner": "administrators",
        "reqownertype": "group",
        "reqobjname" : "message of the day",
        "reqtype" : "view"
    },
    {
        "reqowner": "administrators",
        "reqownertype": "group",
        "reqobjname" : "message of the day",
        "reqtype" : "modify"
    }
];
const test3_data = [
    {
        "requser": "Alice",
        "reqobject" : "message of the day"
    }
];
const test4_data = [
    {
        "reqowner": "Dan",
        "reqobjname": "message of the day",
        "reqtype": "modify"
    }
];


//Defining server location and endpoints - temporary running locally
const baseUrl = supertest("http://localhost:3000");
const apiEndAddUser = "/addusertogroup";
const apiEndAddPerm ="/addpermission";
const apiEndQueryPerm ="/querypermiss";
const apiEndTestPerm = "/testuserperm";

//Defining excpected response schemas
var schema1 = {
    "id": {
        "type": "integer" 
    },
    "groupname": {
        "type": "string"
    },
    "username": {
        "type": "string"
    }
}
var schema2 = {
    "id": {
        "type": "integer" 
    },
    "ownertype": {
        "type": "string"
    },
    "owner": {
        "type": "string"
    },
    "objname": {
        "type": "string"
    }
}
//Seting up headers 
const call_api_add_user = async function (request_body) {
    return baseUrl.post(apiEndAddUser)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body);
}
const call_api_add_perm = async function (request_body) {
    return baseUrl.post(apiEndAddPerm)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body);
}
const call_api_query_perm = async function (request_body) {
    return baseUrl.post(apiEndQueryPerm)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body);
}
const call_api_test_perm = async function (request_body) {
    return baseUrl.post(apiEndTestPerm)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body);
}

//Test 1 - adding user to group 
test1_data.forEach(async function (data) {
    describe(`Add user ${data.requser} to group ${data.reqgroup}`, function () {
        var response;
        var body;
        before(async function () {
            response = await call_api_add_user(data);
            body = response.body;
        });
        //Status code is 200 - succesful
        it("Status code is 200", function () {
            expect(response.status).to.equal(200);
        });
         //Schema is valid
        it("Schema is valid", function() {
        expect(tv4.validate(body, schema1)).to.be.true;
        });
    });
});

//Test 2 - adding permission to user or group 
test2_data.forEach(async function (data) {
    describe(`Add permission over object ${data.reqobjname} to ${data.reqownertype} ${data.reqowner}`, function () {
        var response;
        var body;
        before(async function () {
            response = await call_api_add_perm(data);
            body = response.body;
        });
        //Status code is 200 - succesful
        it("Status code is 200", function () {
            expect(response.status).to.equal(200);
        });
         //Schema is valid
        it("Schema is valid", function() {
        expect(tv4.validate(body, schema2)).to.be.true;
        });
    });
});

//Test 3 - querying permission of user over object
test3_data.forEach(async function (data) {
    describe(`Querry what permissions user ${data.requser} has over object ${data.reqobject}.`, function () {
        var response;
        var body;
        before(async function () {
            response = await call_api_query_perm(data);
            body = response.body;
        });
        //Status code is 200 - succesful
        it("Status code is 200", function () {
            expect(response.status).to.equal(200);
        });
     });
});

//Test 4 - testing particular permission of user over object
test4_data.forEach(async function (data) {
    describe(`Test if user ${data.reqowner} has permission ${data.reqtype} over object ${data.reqobjname}.`, function () {
        var response;
        var body;
        before(async function () {
            response = await call_api_test_perm(data);
            body = response.body;
        });
        //Status code is 200 - succesful
        it("Status code is 200", function () {
            expect(response.status).to.equal(200);
        });
     });
});
