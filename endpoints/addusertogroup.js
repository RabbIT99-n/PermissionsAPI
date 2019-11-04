//Call for adding a user to a group
//
//Requiremenst for inserting data in DB
const adduser= require('../helpfunctions/adduser');
const addgroup= require('../helpfunctions/addgroup');

const handleAddUserToGroup = (req, res, db) => {
    //Parsing req body 
    const { reqgroup, requser} =req.body;
    //Initializing an empty group if group does not exists. 
    //Initialization needed for group clearing to mantain a group when all users are cleared 
    addgroup.handleAddGroup(reqgroup, db);

    //Checking if user-group combination existis in DB table groups
    //if yes returns error if no inserts in DB table
    db.transaction (trx => {
        trx.select('groupname')
        .from('groups')
        .where('groupname', 'ilike', reqgroup)
        .andWhere('username','ilike', requser)
        .then( data => {
            if (data.length===0) {
                return trx('groups')
                .returning('*')
                .insert({
                    groupname: reqgroup,
                    username: requser
                })
                .into('groups')
                .then( group => {
                    res.json(group[0]);
                })
            } 
            return res.status(400).json('This user already exists in this group.');
        })
        .then(trx.commit)
        .catch(trx.rollback)
        .catch (err => res.status(400).json('Error accesing database.'))
    })

    //Inserts new user (implicitly) if needed
    adduser.handleAddUser(requser, db);
  
}

module.exports = {
    handleAddUserToGroup
}



