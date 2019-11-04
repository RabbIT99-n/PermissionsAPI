//Checking if object existis in DB table objects 
//if no inserts new object (implicitly)
const handleAddObject = (reqobjname, db) => {
    db.transaction (trx => {
        trx.select('objname')
        .from('objects')
        .where('objname', 'ilike', reqobjname)
        .then ( data => {
            if (data.length===0) {
                return trx('objects')
                .returning('*')
                .insert( {
                    objname: reqobjname
                })
                .then(obj => {
                    console.log('Inserted new object implicitly.');
                })
            }
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
}
module.exports = {
    handleAddObject
}