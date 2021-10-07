
const express = require("express");


const {getData,getDataByID, addData, deleteData, editData, editDataPatch} = require(__pathControllers + "api");
let router = express.Router();
module.exports = (app) => {
    router.get('/', (req,res,next)=>getData(req, res, next));
    router.get('/:id', (req,res,next)=>getDataByID(req, res, next));
    router.post('/', (req,res,next)=>addData(req,res,next));
    router.delete('/', (req,res,next)=>deleteData(req,res,next));
    router.put('/',(req,res,next)=>editData(req,res,next));
    router.patch('/',(req,res,next)=>editDataPatch(req,res,next));
    return router;
}