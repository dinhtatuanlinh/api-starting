
const express = require("express");


const {getData,getDataByID, addData, deleteData, editData, editDataPatch} = require(__pathControllers + "api");
const {setSingle, getSingle, editSingle, setList, getList, editList, del}= require(__pathControllers + 'redis');
let router = express.Router();
module.exports = (app) => {
    router.get('/', (req,res,next)=>getData(req, res, next));
    router.get('/:id', (req,res,next)=>getDataByID(req, res, next));
    router.post('/', (req,res,next)=>addData(req,res,next));
    router.delete('/', (req,res,next)=>deleteData(req,res,next));
    router.put('/',(req,res,next)=>editData(req,res,next));
    router.patch('/',(req,res,next)=>editDataPatch(req,res,next));
    
    router.get('/redis/:key', (req,res,next)=>getSingle(req,res,next))
    router.post('/redis', (req,res,next)=>setSingle(req,res,next));
    router.put('/redis/editsingle', (req,res,next)=>editSingle(req,res,next));
    router.put('/redis/editList', (req,res,next)=>editList(req,res,next));
    router.delete('/redis/delete',(req,res,next)=>del(req,res,next));
    router.post('/redis/addlist', (req,res,next)=>setList(req,res,next));
    router.get('/redis/getList/:key', (req,res,next)=>getList(req,res,next));
    return router;
}