//Group initialization
//Checking if group existis in DB table groups 
//if no inserts new group with no users (implicitly)

const handleAddGroup = (reqgroup, db) => {
    db.transaction (trx => {
        trx.select('groupname')
        .from('groups')
        .where('groupname', 'ilike', reqgroup)
        .then ( data => {
            if (data.length===0) {
                return trx('groups')
                .returning('*')
                .insert( {
                    groupname: reqgroup,
                    username: ''
                })
                .then(group => {
                    console.log('Inserted new empty group implicitly.');
                })
            }
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
}
module.exports = {
    handleAddGroup
}