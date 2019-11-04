//Call for querying what permissions a particular user has over a particular object
//

const handleQuery = (req, res, db) => {
    //Parsing req body 
    const { requser, reqobject} =req.body;
    //Checking for permissions in joined tables for cases of directly associated
    //or inherited permissions
    db.transaction ( trx => {
        trx.select('type')
        .from('groups')
        .fullOuterJoin('permissions', 'groups.groupname', 'permissions.owner')
        .where('objname', 'ilike', reqobject)
        //Check for inherited permissions
        .andWhere('username', 'ilike', requser)
        //Check for directly associated permissions
        .orWhere('owner', 'ilike', requser)
        .andWhere('ownertype', 'ilike', 'user')
        .then ( found => {
            if (found.length!==0) {
                //Responding with aray of permission types instead of array of objects
                res.json(found.map( (perm, index) => {
                    return perm.type;
                }));
            }
            else {
                res.status(400).json('No query object permissions found.')
            }
            
        })
        .then(trx.commit)
        .catch(trx.rollback)
        .catch (err => res.status(400).json('Error accesing database.'))
    })

}

module.exports = {
    handleQuery
}