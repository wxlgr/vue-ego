const mysql =require('mysql')

const client=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ego'
})

function sqlFn(sql,arr,callback){
    client.query(sql,arr,(err,res)=>{
        if(err){
            console.log(err);
            return
        }
        callback(res)
    })
}
module.exports=sqlFn