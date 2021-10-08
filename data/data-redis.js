const redis = require('redis');
//connect redis
const client = redis.createClient({
    host: 'redis-18521.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 18521,
    password: 'VP6hqisgh6EmJ9DQguRAdpy2J0AsOlCi'
});

client.on('error', err => {
    console.log('Error ' + err);
});
// create a table in redis
let setRedis = async (tableName)=>{

    let result= await getRedis(tableName);
    if(result === null){
        let value = [];
        client.set(tableName, value);

        return true;
    }

    return false;
}
let getRedis = (tableName)=>{
    return new Promise((res, rej)=>{
        client.get(tableName, (err, data)=>{
            if (err) console.log(err);
            if (data !== null) res(data);
            if (data === null ) res(data);
        })
    })
}
let delRedis = async (tableName)=>{
    let result = await getRedis(tableName);
    if(result !== null){
        client.del(tableName)
        return true;
    }
    return false;
}
let addRowRedis = async (tableName, value)=>{
    let result ;
    //add to table if value is array
    if(typeof value === 'object' && typeof value.length === 'number'){
        result = await getRedis(tableName);
        result = result === null ? [] : JSON.parse(result);
        console.log(result);
        console.log(result.length);
        console.log(value);
        let n =result.length;
        for(i= 0; i < value.length; i++){
            let data = {};
            data.id = n++;
            data.username = value[i].username;
            data.email = value[i].email;
            result.push(data);
        }
        
        console.log(result);
        result = JSON.stringify(result);
        await set(tableName, result);
        return 'added array';
    }
    // if value is object

    if(typeof value === 'object' && typeof value.length === 'undefined'){
        result = await getRedis(tableName);
        result = result == null ? [] : JSON.parse(result);
        let data = {};
        data.id = result.length;
        data.username = value.username;
        data.email = value.email;
        result.push(data);
        result = JSON.stringify(result);
        await set(tableName, result);
        return 'added object';
    }
    return false;
}
// edit one or many rows
let editRowRedis = async (tableName, value)=>{
    let result ;
    if(typeof value === 'object' && typeof value.length === 'number'){
        result = await getRedis(tableName);
        result = result == null ? [] : JSON.parse(result);
        value.forEach(element => {
            result.map((e)=>{
                if(element.id === e.id){
                    e.username = element.username;
                    e.email = element.email;
                }
                return e;
            })
        });
        result = JSON.stringify(result);
        await set(tableName, result);
        return 'success edit list';
    }
    if(typeof value === 'object' && typeof value.length === 'undefined'){
        result = await getRedis(tableName);
        result = result == null ? [] : JSON.parse(result);
        result.map((e)=>{
            if(value.id === e.id){
                e.username = value.username;
                e.email = value.email
            }
            return e;
        })
        result = JSON.stringify(result);
        await set(tableName, result);
        return 'success edit a row';
    }
    return false;
}
// delete a row
let delRowRedis = async(tableName, id)=>{
    let result = await getRedis(tableName);
        result = result == null ? [] : JSON.parse(result);
    for(i=0; i< result.length; i++){
        if(result[i].id === id){
            result.splice(i, 1);
            break;
        }
    }
    result = JSON.stringify(result);
    await set(tableName, result);
    return result;
}
let set = (table, data)=>{
    return new Promise((res,rej)=>{
        client.set(table, data);
        res('success');
    })
}
module.exports = {
    setRedis: setRedis,
    getRedis: getRedis,
    delRedis: delRedis,
    addRowRedis: addRowRedis,
    editRowRedis: editRowRedis,
    delRowRedis: delRowRedis,
}