const { json } = require("body-parser");

const {setRedis, getRedis, delRedis, addRowRedis, editRowRedis, delRowRedis} = require(__pathData + "data-redis");

let getDataRedis = async (req,res, next)=>{
    let table = req.params.table
    let result = await getRedis(table);
    console.log(result);
    res.send(result);
}
let createTableRedis = async (req, res, next)=>{
    let table = req.body.table;

    let result = await setRedis(table);
    res.send(result);
}
let deleteTableRedis = async (req, res, next)=>{
    let table = req.body.table;
    let result = await delRedis(table);
    res.send(result);
}
let addRow = async (req, res, next)=>{
    let table = req.body.table;
    let data = req.body.data;
    data = JSON.parse(data);
    let result = await addRowRedis(table, data);
    res.send(result);
}
let editRow = async (req, res, next)=>{
    let table = req.body.table;
    let data = req.body.data;
    data = JSON.parse(data);
    let result = await editRowRedis(table, data);
    res.send(result);
}
let deleteRow = async (req, res, next)=>{
    let table = req.body.table;
    let id = parseInt(req.body.id);
    let result= await delRowRedis(table, id);
    res.send(result);
}
module.exports= {getDataRedis, createTableRedis, deleteTableRedis, addRow, editRow, deleteRow};