
const express = require("express");


const {getData,getDataByID, addData, deleteData, editData, editDataPatch} = require(__pathControllers + "api");
const {getDataRedis, createTableRedis, deleteTableRedis, addRow, editRow, deleteRow}= require(__pathControllers + 'redis');
let router = express.Router();
module.exports = (app) => {
    router.get('/', (req,res,next)=>getData(req, res, next));
    router.get('/:id', (req,res,next)=>getDataByID(req, res, next));
    router.post('/', (req,res,next)=>addData(req,res,next));
    router.delete('/', (req,res,next)=>deleteData(req,res,next));
    router.put('/',(req,res,next)=>editData(req,res,next));
    router.patch('/',(req,res,next)=>editDataPatch(req,res,next));
    
    router.get('/redis/:table', (req,res,next)=>getDataRedis(req,res,next))
    router.post('/redis', (req,res,next)=>createTableRedis(req,res,next));
    router.delete('/redis', (req,res,next)=>deleteTableRedis(req,res,next));
    router.post('/redis/add', (req,res,next)=>addRow(req,res,next));
    router.put('/redis/edit', (req,res,next)=>editRow(req,res,next));
    router.delete('/redis/delete',(req,res,next)=>deleteRow(req,res,next));
    return router;
}