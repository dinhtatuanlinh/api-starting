const database = require("../services/databaseManipulation");

const data = new database();
module.exports.getData = (req, res, next) => {
    let result = data.getAllData();
    res.send(result);
};
module.exports.getDataByID = (req, res, next) => {
    let id = parseInt(req.params.id);

    let result = data.getDataByID(id);
    res.send(result);
};
module.exports.addData = async (req, res, next) => {
    let input = req.body;
    
    let result = await data.addData(input);
    if (result) {
        res.send("success");
    } else {
        res.send("failure");
    }
};
module.exports.deleteData = async (req, res, next) => {

    let id = parseInt(req.body.id);
    let result = await data.deleteData(id);
    if (result) {
        res.send("success");
    } else {
        res.send("failure");
    }
}
module.exports.editData = async (req, res, next) => {
    let result = await data.editData(req.body);
    if (result) {
        res.send("success");
    } else {
        res.send("failure");
    }
}
module.exports.editDataPatch = async (req, res, next) => {
    let result = await data.editDataPatch(req.body);
    if (result) {
        res.send("success");
    } else {
        res.send("failure");
    }
}