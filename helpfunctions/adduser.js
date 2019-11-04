//Checking if user existis in DB table users 
//if no inserts new user (implicitly)
const handleAddUser = (requser, db) => {
    db.transaction (trx => {
        trx.select('username')
        .from('users')
        .where('username', 'ilike', requser)
        .then ( data => {
            if (data.length===0) {
                return trx('users')
                .returning('*')
                .insert( {
                    username: requser
                })
                .then(user => {
                    console.log('Inserted new user implicitly.');
                })
            }
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
}
module.exports = {
    handleAddUser
}