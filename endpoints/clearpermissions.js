//Call for deleting all permissions from user or group
//NOTE: not deleting inherited permissions
//
const handleClearPerm = (req, res, db) => {
    //Parsing req body 
    const { reqownertype, reqowner} =req.body;
    //Checking for owner in table permissions and deleting all associated permissions
    db('permissions')
        .where('owner', 'ilike', reqowner)
        //Checking for owner type (user or group) for cases of the same name 
        .andWhere('ownertype', 'ilike', reqownertype) 
        .del()
        .then (count => {
            if (count!==0) {
                res.json(`Total of ${count} permissions cleared from ${reqownertype} ${reqowner}.`);
            }
            else {
                throw err;
            }
        })
        .catch (err => res.status(400).json('Error finding permissions owner in database.'));
}

module.exports = {
    handleClearPerm
}