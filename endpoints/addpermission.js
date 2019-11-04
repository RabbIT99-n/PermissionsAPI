//Call for adding a permission to a group or user
//
//Requiremenst for inserting data in DB
const adduser= require('../helpfunctions/adduser');
const addgroup= require('../helpfunctions/addgroup');
const addobject= require('../helpfunctions/addobject');

const handleAddPermission = (req, res, db) => {
    //Parsing req body 
    const { reqowner, reqownertype, reqobjname, reqtype} =req.body;
    //Checking if req input combination existis in DB table permissions
    //if yes returns error if no inserts permission in DB table
    db.transaction (trx => {
        trx.select('objname')
        .from('permissions')
        .where('owner', 'ilike', reqowner)
        .andWhere('ownertype','ilike', reqownertype)
        .andWhere('objname', 'ilike', reqobjname)
        .andWhere('type', 'ilike', reqtype)
        .then( data => {
            if (data.length===0) {
                return trx('permissions')
                .returning('*')
                .insert({
                    owner: reqowner,
                    ownertype: reqownertype,
                    objname: reqobjname,
                    type: reqtype
                })
                .into('permissions')
                .then( permission => {
                    res.json(permission[0]);
                })
            } 
            return res.status(400).json('This permission already exists.');
        })
        .then(trx.commit)
        .catch(trx.rollback)
        .catch (err => res.status(400).json('Error accesing database.'))
    })
    if (reqownertype.toLowerCase()==='user') {
        //Inserts new user (implicitly) if needed
        adduser.handleAddUser(reqowner, db);
    }
    if (reqownertype.toLowerCase()==='group') {
        //Inserts new group (implicitly) if needed
        addgroup.handleAddGroup(reqowner, db);
    }
    //Inserts new object (implicitly) if needed
    addobject.handleAddObject(reqobjname, db);

    
}

module.exports = {
    handleAddPermission
}