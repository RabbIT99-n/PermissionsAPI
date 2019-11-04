//Call for clearing all users from group
//
const handleClearGroup = (req, res, db) => {
    //Parsing req body 
    const { reqgroup} =req.body;
    //Checking for groupname in table groups and deleting users
     db('groups')
        .where('groupname', 'ilike', reqgroup)
        //Group initialization is maintained
        .andWhereNot('username', '')
        .del()
        .then (count => {
            if (count!==0) {
                res.json(`Total of ${count} users cleared from group.`)
            }
            else {
                throw err
            }
        })
        .catch (err => res.status(400).json('Error finding group in database.'))
}

module.exports = {
    handleClearGroup
}
