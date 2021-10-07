var fs = require("fs");
module.exports = class database {
    constructor() {

    }
    getAllData() {
        let users = fs.readFileSync(__pathData + "users.json");
        users = JSON.parse(users);
        return users;
    }
    getDataByID(id) {
        let users = this.getAllData();
        let user = users.filter((user)=> user.id === id);
        return user;
    }
    addData(data) {
        let users = this.getAllData();
        data.id = users[users.length - 1].id + 1;
        users.push(data);
        users = JSON.stringify(users);
        return this.write(users)
    }
    deleteData(id) {
        let users = this.getAllData();
        users = users.filter((user) => user.id !== id);
        users = JSON.stringify(users);
        return this.write(users)
    }
    editData(data) {
        let users = this.getAllData();
        let id = parseInt(data.id);
        users = users.map((user)=>{
            if(user.id === id){
                user.username = data.username;
                user.email = data.email;
            }
            return user;
        });
        users = JSON.stringify(users);
        return this.write(users)
    }
    editDataPatch(data){
        let users = this.getAllData();
        let id = parseInt(data.id);
        users = users.map((user)=>{
            if(user.id === id){
                console.log(user.username, user.email);
                user.username = data.username?data.username: user.username;
                user.email = data.email?data.email: user.email;
            }
            return user;
        });
        users = JSON.stringify(users);
        return this.write(users)
    }
    write(users){
        return new Promise((res, rej) => {
            fs.writeFile(__pathData + "users.json", users, (err) => {
                if (err) res(err);
                res(true);
            });
        });
    }
};
