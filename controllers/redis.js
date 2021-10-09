const {    setSingleRedis,
    editSingleRedis,
    getSingleRedis,
    setListRedis,
    getListRedis,
    editListRedis,
    delRowRedis,} = require(__pathData + "data-redis");

let setSingle = (req, res, next)=>{
    let key = req.body.key;
    let value = req.body.value;
    console.log(key);
    let result = setSingleRedis(key, value);
    res.send(result);
}
let getSingle = async (req, res, next)=>{
    let key = req.params.key;


    let result = await getSingleRedis(key);
    res.send(result);
}
let editSingle = (req, res, next)=>{
    let key = req.body.key;
    let value = req.body.value;

    let result = editSingleRedis(key, value);
    res.send(result);
}
let setList = (req, res, next)=>{
    let key = req.body.key;
    let value = req.body.value;
    let result = setListRedis(key,value);
    res.send(result);
}
let getList = async(req, res, next)=>{
    let key = req.params.key;
    let result = await getListRedis(key);
    res.send(result);
}
let editList = async(req, res, next)=>{
    let key = req.body.key;
    let value = req.body.value;
    let index = parseInt(req.body.index);
    let result = await editListRedis(key,value,index);
    res.send(result);
}
let del = (req,res,next)=>{
    let key = req.body.key;
    let result = delRowRedis(key);
    res.send(result);
}
module.exports= {setSingle, getSingle, editSingle, setList, getList, editList, del};