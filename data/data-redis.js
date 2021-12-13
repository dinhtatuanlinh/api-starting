const redis = require("redis");
//connect redis
const client = redis.createClient({
    host: "redis-18521.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
    port: 18521,
    password: "VP6hqisgh6EmJ9DQguRAdpy2J0AsOlCi",
});

client.on("error", (err) => {
    console.log("Error " + err);
});
// create a table in redis
let setSingleRedis = (key, value) => {
    
    client.set(key, value, (err, res)=>{
        if(err) throw err;
        return res;
    });
};
let getSingleRedis = (key) => {
    return new Promise((res, rej)=>{
        client.get(key, (err, response)=>{
            if(err) throw err;
            res(response);
        });
    })
    
};
let editSingleRedis = (key, value) => {
    client.set(key, value, (err, res)=>{
        if(err) throw err;
        return res;
    });
};
let delRowRedis = (key) => {
    client.del(key, (err, res)=>{
        if(err) throw err;
        return res;
    });
};
let setListRedis = (key, value, position = true) => {
    if (position) {
        // rpush add an element to the last of array
        // lpush add an element to the first of array
        client.rpush(key, value, function (err, reply) {
            console.log(reply); // 2
            return reply;
        });
    } else {
        // lpush add an element to the first of array
        client.lpush(key, value, function (err, reply) {
            console.log(reply); // 2
            return reply;
        });
    }
};
let getListRedis = (key) => {
    return new Promise((res, rej) => {
        //   list the value
        client.lrange(key, 0, -1, function (err, object) {

            res(object);
        });
    });
};
let editListRedis = async(key, value, index) => {
    let result = await getListRedis(key);

    result = result.map((e, i)=>{

        if(index === i){
            e = value;
            console.log(value);
        }
        return e
    })
    console.log(result);
    var multi = client.multi();
    for (var i=0; i<result.length; i++) {
	    multi.rpush('testlist', result[i]);
	}
    multi.exec(function(err, response) {
		if(err) throw err; 
        return response;
	})
};
module.exports = {
    setSingleRedis,
    editSingleRedis,
    getSingleRedis,
    setListRedis,
    getListRedis,
    editListRedis,
    delRowRedis,
};
