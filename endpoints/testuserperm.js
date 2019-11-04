//Call for testing if a particular user has a particular permission over a
// particular object. Returns true or false. 
//
const condTest = (req, res, db) => {
    //Parsing req body 
    const { reqowner, reqobjname, reqtype} =req.body;

    //Checking for owner with  particular permission over a particular object 
    db.transaction (trx => {
        trx.select('objname')
        .from('permissions')
        //First checking for directly associated permissions
        .where('owner', 'ilike', reqowner)
        //Checking only for users 
        .andWhere('ownertype', 'ilike', 'user') 
        .andWhere('objname', 'ilike', reqobjname)
        .andWhere('type', 'ilike', reqtype)
        .then (found => {
            if (found.length !==0) {
                return res.json(true);
            }
        })
        .then(trx.commit)
        .catch(trx.rollback)
        .catch (err => res.status(400).json('Error accesing database.'))
    })
    //Checking for permissions inherited from groups
    db.transaction ( trx => {
        trx.select('*')
        .from('groups')
        .fullOuterJoin('permissions', 'groups.groupname', 'permissions.owner')
        //Checking only for groups
        .where('ownertype', 'ilike', 'group')
        .andWhere('username', 'ilike', reqowner)
        .then ( found => {
            if (found.length !==0) {
                return res.json(true);
            }
            else {
                //If no searched permission is found then it does not exists
                return res.json(false);
            }
        })
        .then(trx.commit)
        .catch(trx.rollback)
        .catch (err => res.status(400).json('Error accesing database.'))
    })
}

module.exports = {
    condTest
}