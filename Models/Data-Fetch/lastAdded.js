


const sql =require('mssql')


const lastAddedF = ()=>{
    return new Promise(async(resolve,reject)=>{
        let resolvt = await sql.query`SELECT *
        FROM mezarInfo
        WHERE dates >= DATEADD(HOUR, -48, GETDATE())`
        resolve(resolvt.recordset)
    })
}

module.exports = {lastAddedF}